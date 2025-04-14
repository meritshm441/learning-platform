import React from "react";
import { SolutionItem } from "@/lib/models/ourSolutionsItem";
import { ourSolutionData } from "@/data/home";
import Image from "next/image";

const OurSolution = () => {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="flex flex-col items-center justify-center gap-14 w-full max-w-7xl px-[16px] sm:px-[24px] lg:px-[40px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4 w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold md:text-[2.75rem] lg:text-[3.5rem]">
            Our Solution
          </h1>
          <p className="font-normal text-center leading-relaxed max-w-xl mx-auto">
            Create your account quickly with just your email or social media login,
            then explore a wide range.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
          {ourSolutionData.map(({ id, icon: Icon, title, description, price }: SolutionItem) => (
            <div
              key={id}
              className="group bg-white rounded-lg drop-shadow-xl border border-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-start justify-start gap-4 p-6">
                <div className="flex items-start justify-start w-[80px] h-[80px]">
                  <Image
                    src={Icon}
                    alt={title}
                    width={50}
                    height={50}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h2 className="text-xl font-bold md:text-[1.25rem] lg:text-xl">
                  {title}
                </h2>
                <p className="font-normal text-left leading-relaxed">
                  {description}
                </p>
                <div className="flex items-center justify-between gap-2 font-bold w-full mt-auto">
                  <div className="flex items-center justify-center gap-2 font-normal text-sm">
                    <span className="font-medium text-gray-400">Price:</span>
                    <span>{price}</span>
                  </div>
                  <button className="text-blue-600 font-normal hover:text-blue-800 transition-colors duration-300">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurSolution;