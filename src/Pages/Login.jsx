import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const onSubmit = async (values) => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    const users = response.data;
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );
    if (user) {
      // Set user id as token in local storage
      localStorage.setItem("token", user.id);
      // Redirect user to another page
      // window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
};

const validationSchema = yup.object({
  email: yup
    .string("enter your email")
    .email("email is not correct")
    .required("email is required"),

  password: yup
    .string("enter your password")
    .min(8, "password is not correct")
    .required("password is required"),
});

export const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const users = response.data;
        const user = users.find(
          (u) => u.email === values.email && u.password === values.password
        );
        if (user) {
          localStorage.setItem("token", user.id);
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className="bg-gradient-to-br from-orange-600 to-red-900 h-screen flex justify-center items-center"
      style={{ backgroundImage: "url(images/back.jpg)" }}
    >
      <div className="bg-white rounded-xl p-10 shadow-lg">
        <h1 className="text-5xl font-bold mb-5 text-center text-gray-800">
          Log In
        </h1>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
          <div className="flex justify-between flex-col items-center mb-5">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 rounded-lg py-3 px-5 text-lg text-white focus:outline-none"
            >
              Submit
            </button>
            <Link
              to="/password"
              className="text-lg hover:text-orange-600 duration-300 mt-2 text-gray-800"
            >
              Forgot your password?
            </Link>
            <Link
              to="/singup"
              className="text-lg mt-2 hover:text-orange-600 duration-300 text-gray-800"
            >
              dont have an acount? sing up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
