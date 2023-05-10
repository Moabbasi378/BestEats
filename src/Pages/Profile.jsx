import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../componants/Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { History } from "../componants/OrderHistory";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [numOrders, setNumOrders] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email address").required("Required"),
    address: yup.string().required("Required"),
    phone: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:8000/users/${userData.id}`, {
          ...values,
          password: userData.password,
          wallet: userData.wallet,
          orders: userData.orders,
        })
        .then((response) => {
          setUserData(response.data);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:8000/users/${token}`)
        .then((response) => {
          setUserData(response.data);
          formik.setValues({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            email: response.data.email || "",
            address: response.data.address || "",
            phone: response.data.phone || "",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:8000/orders?userId=${userData.id}`)
        .then((response) => {
          setNumOrders(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
      setNumOrders(userData.orders);
      setWalletAmount(userData.wallet);
    }
  }, [userData]);

  return (
    <div className="mx-10 my-5">
      <Navbar />
      {userData ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-lg font-bold text-orange-600 mb-2">
                Number of Orders
              </h2>
              <p className="text-gray-700 text-5xl font-extrabold">
                {numOrders.length}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-lg font-bold text-orange-600 mb-2">
                Wallet Amount
              </h2>
              <p className="text-gray-700 text-5xl font-extrabold">
                ${walletAmount}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg md:col-span-2">
            <h2 className="text-lg font-bold text-orange-600 mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-xl">
                  <span className="font-bold">Name:</span> {userData.firstName}{" "}
                  {userData.lastName}
                </p>
              </div>
              <div className="bg-white  p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-xl relative ">
                  <span className="font-bold">Email:</span> {userData.email}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-xl">
                  <span className="font-bold">Address:</span> {userData.address}
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-xl">
                  <span className="font-bold">Phone:</span> {userData.phone}
                </p>
              </div>
            </div>
            <div className="mt-6 text-right flex flex-row-reverse">
              <div
                onClick={openModal}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                eddit Information
              </div>
              <span className="px-2">|</span>
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                Logout
              </a>
            </div>
          </div>
          {isModalOpen ? (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="mb-4">
                        <label
                          htmlFor="firstName"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Enter your first name:
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.firstName && formik.touched.firstName
                              ? "border border-red-500 p-2 w-full rounded-xl"
                              : "border border-gray-500 p-2 w-full rounded-xl"
                          }
                        />
                        {formik.errors.firstName &&
                          formik.touched.firstName && (
                            <div className="text-red-500">
                              {formik.errors.firstName}
                            </div>
                          )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="lastName"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Enter your last name:
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.lastName && formik.touched.lastName
                              ? "border border-red-500 p-2 w-full rounded-xl"
                              : "border border-gray-500 p-2 w-full rounded-xl"
                          }
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                          <div className="text-red-500">
                            {formik.errors.lastName}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Enter your new email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.email && formik.touched.email
                              ? "border border-red-500 p-2 w-full rounded-xl"
                              : "border border-gray-500 p-2 w-full rounded-xl"
                          }
                        />
                        {formik.errors.email && formik.touched.email && (
                          <div className="text-red-500">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="number"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          Enter your new number:
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.errors.phone && formik.touched.phone
                              ? "border border-red-500 p-2 w-full rounded-xl"
                              : "border border-gray-500 p-2 w-full rounded-xl"
                          }
                        />
                        {formik.errors.phone && formik.touched.phone && (
                          <div className="text-red-500">
                            {formik.errors.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <div className="loader  ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-gray-700 text-xl font-semibold">
              Loading...
            </h2>
          </div>
        </div>
      )}
      <History />
    </div>
  );
};
