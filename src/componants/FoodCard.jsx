import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FoodCard = ({ name, src, price, id, description, time }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:8000/users/${token}`)
        .then((response) => {
          setUserData(response.data);
          setCart(response.data.cart);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && userData) {
      axios
        .put(`http://localhost:8000/users/${token}`, {
          totalspent: userData.totalspent,
          firstName: userData.firstName,
          cart: cart,
          lastName: userData.lastName,
          email: userData.email,
          address: userData.address,
          phone: userData.phone,
          password: userData.password,
          wallet: userData.wallet,
          orders: userData.orders,
          id: userData.id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cart, userData]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    const item = id;
    setCart([...cart, item]);
    handleCloseModal();
    console.log(cart);
    toast.success(`${name} added to cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`border shadow-lg duration-300 rounded-t-lg cursor-pointer ${
          isHovered ? "border-orange-600 transform scale-105" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src}
          alt={`Delicious ${name}`}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="flex justify-between items-center px-2 py-4">
          <p className="font-medium text-lg">{name}</p>
          <button
            onClick={(event) => handleAddToCart(event)}
            className="bg-orange-600 border-orange-600 text-white px-4 py-2 hover:bg-white hover:text-orange-600 duration-300 rounded-full font-medium"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-between items-center px-2 py-1 bg-gray-100">
          <p className="font-medium text-lg">${price}</p>
          <p className="text-gray-400 text-sm">Free Delivery</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-lg p-6 flex flex-col items-center max-w-sm shadow-lg ${
              isClosing ? "animate-fade-out" : "animate-fade-in"
            }`}
          >
            <img
              src={src}
              alt={name}
              className="rounded-lg shadow-md h-[400px] w-full object-cover"
            />
            <div className="flex justify-between items-center mt-4 w-full">
              <h2 className="font-bold text-3xl text-gray-900">{name}</h2>
              <p className="font-bold text-3xl text-orange-600">${price}</p>
            </div>
            <p className="mt-4 text-lg text-gray-700">{description}</p>
            <p className="mt-2 text-base text-gray-700">{`Time to cook: ${time} mins`}</p>
            <div className="flex justify-center mt-6 space-x-6">
              <button
                className="bg-orange-600 text-white p-4 rounded-full hover:bg-white hover:text-orange-600 duration-300"
                onClick={(event) => handleAddToCart(event)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                className="bg-gray-300 text-gray-700 p-4 rounded-full hover:bg-gray-400 duration-300"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
