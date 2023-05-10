import axios from "axios";
import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";

export const Food = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/foods`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Item
      </h1>
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <p className="font-bold text-gray-700">Filter Types</p>
          <div className="flex justify-between flex-wrap">
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110">
              All
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110 ">
              Burgers
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110 ">
              Pizza
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110 ">
              Salads
            </button>
            <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110 ">
              chickens
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110">
            $
          </button>
          <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110">
            $$
          </button>
          <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110">
            $$$
          </button>
          <button className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white m-1 duration-700 hover:scale-110">
            $$$$
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {userData?.map((food) => {
          return (
            <FoodCard
              src={food.src}
              price={food.price}
              name={food.name}
              description={food.discription}
              time={food.time}
              id={food.id}
            />
          );
        })}
      </div>
      <div className="flex justify-center pt-5">
        <div
          className="h-8 w-8 text-orange-600 animate-spin p-8 rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};
