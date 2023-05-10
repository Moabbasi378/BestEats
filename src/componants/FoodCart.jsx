import { Delete, DeleteOutlineOutlined } from "@mui/icons-material";
import { useState } from "react";

export const FoodCart = () => {
  const [count, setCount] = useState(1);
  return (
    <div className=" h-[230px] my-5  items-center border flex flex-row rounded-2xl shadow-xl w-[85%]">
      <img
        src="images/pasta1.jpg"
        alt=""
        className="h-full rounded-tl-2xl rounded-bl-2xl w-[390px] object-cover"
      />
      <div className=" mx-auto grid grid-flow-col gap-52 justify-between items-center p-4">
        <div className="flex flex-col items-center ">
          <h1 className="font-bold text-3xl  ">Pasta Alfredo</h1>
          <h2>a good best pasta</h2>
        </div>
        <div className="font-bold text-3xl ">
          <p>
            <span className="text-orange-600 text-xl">$ </span>15.99
          </p>
        </div>
        <div className="font-bold text-3xl ">
          <div className="flex bg-orange-600 px-5 py-3 rounded-2xl justify-evenly">
            <p
              className="cursor-pointer p-2"
              onClick={() => {
                if (count !== 1) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </p>
            <p className="cursor-default p-2 ">{count}</p>
            <p
              className="cursor-pointer p-2"
              onClick={() => {
                if (count !== 9) {
                  setCount(count + 1);
                }
              }}
            >
              +
            </p>
          </div>
        </div>
        <div className="text-orange-600 cursor-pointer ">
          <DeleteOutlineOutlined sx={{ fontSize: "4rem" }} />
        </div>
      </div>
    </div>
  );
};
