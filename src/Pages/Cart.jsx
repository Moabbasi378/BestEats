import { CartItem } from "../componants/CartItem";
import { Navbar } from "../componants/Navbar";
export const Cart = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
          Your <span className="text-orange-600">Cart</span>
        </h1>
        <CartItem />
      </div>
    </div>
  );
};
