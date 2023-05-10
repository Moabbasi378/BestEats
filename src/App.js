import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import { Password } from "./Pages/Password";
import { Signup } from "./Pages/SingUp";
import { Layout } from "./componants/Layout";
import { Profile } from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const currentTime = Date();
console.log(currentTime);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/password" element={<Password />} />
        <Route
          path="/singup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />

        <Route path="*" element={<h1 style={{ color: "red" }}>Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
