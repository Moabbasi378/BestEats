import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Email is not correct")
    .required("Email is required"),
  phone: yup

    .string("Enter your phone number")
    .required("Phone number is required"),
  address: yup.string("Enter your address").required("Address is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .get("http://localhost:8000/users?email=" + values.email)
        .then((emailResponse) => {
          if (emailResponse.data.length > 0) {
            formik.setErrors({ email: "Email already exists" });
          } else {
            axios
              .get("http://localhost:8000/users?phone=" + values.phone)
              .then((phoneResponse) => {
                if (phoneResponse.data.length > 0) {
                  formik.setErrors({ phone: "Phone number already exists" });
                } else {
                  axios
                    .post("http://localhost:8000/users", {
                      ...values,
                      id: uuidv4(),
                      wallet: 0,
                      orders: [],
                      cart: [],
                    })
                    .then((response) => {
                      console.log(response.data);
                      localStorage.setItem("token", response.data.id);
                      navigate("/");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gradient-to-br from-orange-600 to-red-900 h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl p-10 shadow-lg">
        <h1 className="text-5xl font-bold mb-5 text-center text-gray-800">
          Sign Up
        </h1>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="mb-7 h-16">
            <input
              name="firstName"
              id="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              type="text"
              placeholder="First Name"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 mt-2 ml-1">
                {formik.errors.firstName}
              </p>
            ) : null}
          </div>
          <div className="mb-7 h-16">
            <input
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              type="text"
              placeholder="Last Name"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 mt-2 ml-1">{formik.errors.lastName}</p>
            ) : null}
          </div>
          <div className="mb-7 h-16">
            <input
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="text"
              placeholder="Email"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 mt-2 ml-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-7 h-16">
            <input
              name="address"
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              type="text"
              placeholder="Address"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-red-500 mt-2 ml-1">{formik.errors.address}</p>
            ) : null}
          </div>
          <div className="mb-7 h-16">
            <input
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              pattern="[0-9]*"
              minLength={9}
              maxLength={12}
              placeholder="Phone Number"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-500 mt-2 ml-1">{formik.errors.phone}</p>
            ) : null}
          </div>
          <div className="mb-7 h-16 relative">
            <input
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-gray-200 rounded-lg py-3 px-5 w-full text-lg text-gray-800 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 "
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 mt-2 ml-1">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="flex flex-col justify-between items-center mb-5">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 rounded-lg py-3 px-5 text-lg text-white focus:outline-none"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-lg mt-4 text-gray-800">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
