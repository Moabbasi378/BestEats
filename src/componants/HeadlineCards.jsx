export const HeadlineCards = ({ src, primary, secondary }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="relative">
        <img className="w-full h-auto object-cover" src={src} alt=""></img>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="font-bold text-3xl text-white text-center px-6 mb-2">
            {primary}
          </p>
          <p className="text-lg text-white text-center px-6 mb-4 leading-relaxed">
            {secondary}
          </p>
          <button className="bg-white text-black border-white hover:border-orange-600  font-bold py-2 px-4 rounded-full hover:bg-orange-600 hover:text-white transition duration-300">
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};
