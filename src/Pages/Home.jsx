import { Food } from "../componants/Food";
import { Footer } from "../componants/Footer";
import { HeadlineCards } from "../componants/HeadlineCards";
import { Hero } from "../componants/Hero";
import { Navbar } from "../componants/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-[1640px] mx-auto p-4 py-2 grid md:grid-cols-3 gap-6">
        <HeadlineCards
          src={"images/food4.jpg"}
          primary={"Sun's out BOGO's out"}
          secondary={"throught 28/8"}
        />
        <HeadlineCards
          src={"images/food3.jpg"}
          primary={"New resturant"}
          secondary={"added daily"}
        />
        <HeadlineCards
          src={"images/food1.jpg"}
          primary={"We Deliver Desserts"}
          secondary={"tasty treats"}
        />
      </div>
      <Food />
      <Footer />
    </>
  );
};
