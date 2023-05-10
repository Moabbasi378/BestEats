export const Hero = () => {
  return (
    <div className="max-w-[1640px] mx-auto p-4 ">
      <div className="max-h-[500px] relative ">
        <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center rounded-2xl">
          <h1 className="px-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            The <span className="text-orange-500">Best</span>
          </h1>
          <h1 className="px-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-orange-500">Food</span> Delivery
          </h1>
        </div>
        <img
          className="w-full max-h-[500px] object-cover rounded-2xl"
          src="images/bacon.jpg"
          alt="hero_image"
        />
      </div>
    </div>
  );
};
