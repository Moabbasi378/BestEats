import {
  Bookmark,
  BookmarkAddOutlined,
  Close,
  Download,
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  FireTruck,
  GroupAddOutlined,
  Help,
  HelpOutline,
  LocalShipping,
  LocalShippingOutlined,
  MenuOutlined,
  SearchOutlined,
  Shop,
  Shop2,
  ShoppingBasket,
  Wallet,
  WalletOutlined,
} from "@mui/icons-material";
import { useState } from "react";

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <div className="max-w-[1980px] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <MenuOutlined />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2">
          Best <span className="font-bold ">Eats</span>
        </h1>
        <div className="hidden lg:flex bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2">Delivery</p>
          <p className="p-2 ">pickup</p>
        </div>
      </div>
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <SearchOutlined size={20} />
        <input
          type="text"
          placeholder="search foods"
          className="bg-transparent p-2 focus:outline-none w-full"
        />
      </div>

      <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full ">
        <ShoppingBasket className="mr-2" /> cart
      </button>

      {nav ? (
        <div className="bg-black/80 fixed left-0 w-full h-screen z-10 top-0 "></div>
      ) : (
        ""
      )}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <Close
          onClick={() => setNav(!nav)}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Best <span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800 ">
            <li className="text-xl py-4 flex">
              <LocalShippingOutlined className="mr-4" /> orders
            </li>
            <li className="text-xl py-4 flex">
              <FavoriteBorderOutlined className="mr-4" /> favourite
            </li>
            <li className="text-xl py-4 flex">
              <Wallet className="mr-4" /> wallet
            </li>
            <li className="text-xl py-4 flex">
              <HelpOutline className="mr-4" /> help
            </li>
            <li className="text-xl py-4 flex">
              <BookmarkAddOutlined className="mr-4" /> promotions
            </li>
            <li className="text-xl py-4 flex">
              <Download className="mr-4" /> best ones
            </li>
            <li className="text-xl py-4 flex">
              <GroupAddOutlined className="mr-4" /> invite friends
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
