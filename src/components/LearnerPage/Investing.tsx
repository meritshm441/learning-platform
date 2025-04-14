import React from "react";

const Investing = () => {
  return (
    <div
      className="w-full h-[222px] bg-cover bg-center flex justify-center items-center px-8 sm:px-16 md:px-32 lg:px-52 py-4 sm:py-6 md:py-8 lg:py-12"
      style={{
        backgroundImage: `
          linear-gradient(to left, rgba(1, 88, 154, 0.95) 0%, rgba(1, 88, 154, 0.95) 80%, transparent 100%),
          url('/images/investingbg.jpg')
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center w-full h-full gap-4">
        <div className="flex flex-col gap-3 text-left w-full lg:w-2/3  pr-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            It’s time to start investing in yourself
          </h1>
          <p className="text-base sm:text-lg font-normal text-white w-[85%]">
            Online courses open the opportunity for learning to almost anyone,
            regardless of their scheduling commitments.
          </p>
        </div>
        <div className="w-full lg:w-auto mt-4 lg:mt-0 flex justify-center lg:justify-end">
          <button className="bg-[#01589A] border border-white text-white px-6 py-2 rounded hover:bg-[#014273] transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Investing;
