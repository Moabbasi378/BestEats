import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
const HistoryFoodItem = ({ itemId, isLoading }) => {
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/foods/${itemId}`)
      .then((response) => {
        setFoodData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [itemId]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-center md:justify-start mb-2 md:mb-0">
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          foodData && (
            <img
              src={foodData.src}
              alt="food"
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
          )
        )}
        <div>
          {foodData && (
            <div className="text-lg font-medium">{foodData.name}</div>
          )}
          <div className="text-sm text-gray-500">
            {foodData && `$${foodData.price}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export const History = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8000/users/${token}`)
        .then((response) => {
          setUserData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred while retrieving your orders.");
          setIsLoading(false);
        });
    }
  }, []);

  const orders = userData?.orders || [];

  const handleReorder = (order) => {
    console.log("Reordering", order);
    // add logic to reorder the items in the order
  };

  return (
    <div className="mt-5 bg-gray-100 p-5 grid-cols-1 rounded-xl shadow-2xl">
      {isLoading ? (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orders.length === 0 ? (
        <div className="alert alert-info">You have no orders yet.</div>
      ) : (
        <div>
          <h2 className="text-2xl mb-4 font-medium">Order History</h2>
          {orders.map((order, index) => (
            <div key={order.id} className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-medium">Order {index + 1}</div>
                <button
                  className="bg-orange-600 hover:bg-orange-700 duration-300 border-0 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleReorder(order)}
                >
                  Reorder
                </button>
              </div>
              {order.map((item) => (
                <HistoryFoodItem itemId={item} />
              ))}
            </div>
          ))}

          <div className="mt-10 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-medium mb-4">Order Statistics</h3>
            <ul className="list-disc pl-6">
              <li className="mb-2">
                <span className="font-medium">Total orders:</span>{" "}
                {orders.length}
              </li>
              <li className="mb-2">
                <span className="font-medium">Most ordered item:</span>{" "}
                {"mostOrderedItem"} ({"mostOrderedItemQuantity"} orders)
              </li>
              <li>
                <span className="font-medium">Total spent:</span> $
                {userData.totalspent}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
