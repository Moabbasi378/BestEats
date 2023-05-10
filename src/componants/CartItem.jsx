import axios from "axios";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const CartItem = () => {
  const [userData, setUserData] = useState(null);
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:8000/users/${token}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/foods`)
      .then((response) => {
        setFoodData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const cartItems = {};
  userData?.cart.forEach((food) => {
    cartItems[food] = (cartItems[food] || 0) + 1;
  });

  const handleAddItem = (food) => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/users/${token}/cart`, { food })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveItem = (food) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/users/${token}/cart`, { data: { food } })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.keys(cartItems).map((food) => {
          const quantity = cartItems[food];
          const price = foodData[food - 1].price;
          return (
            <div
              key={food}
              className="bg-white rounded-lg p-4 border border-gray-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <img
                src={foodData[food - 1].src}
                alt={foodData[food - 1].name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800 font-sans">
                  {foodData[food - 1].name}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 text-xl p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                    onClick={() => handleRemoveItem(food)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-500 text-lg">{quantity}</p>
                  <button
                    className="text-gray-500 text-xl p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                    onClick={() => handleAddItem(food)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500">${price} each</p>
                <p className="text-lg font-bold">${quantity * price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
