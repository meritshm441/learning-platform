import React from "react";
import { FaClock, FaGraduationCap, FaUserGraduate } from "react-icons/fa6";

const stats = [
  {
    icon: <FaGraduationCap className="w-20 h-20 text-[#679BC2] mb-4" />,
    value: "4+",
    label: "Courses",
  },
  {
    icon: <FaUserGraduate className="w-20 h-20 text-[#679BC2] mb-4" />,
    value: "200+",
    label: "Course students",
  },
  {
    icon: <FaClock className="w-20 h-20 text-[#679BC2] mb-4" />,
    value: "250+",
    label: "Hours of content",
  },
];

const StatItem = ({ icon, value, label }: any) => (
  <div className="flex flex-col items-center justify-center text-center w-full">
    {icon}
    <h2 className="text-[#679BC2] text-5xl sm:text-6xl font-bold">{value}</h2>
    <p className="text-black text-xl sm:text-2xl font-medium mt-2">{label}</p>
  </div>
);

const Proud = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-5 md:py-10 lg:py-20  bg-[#F9FAFB] px-4 sm:px-6 lg:px-10 lg:gap-16 md:gap-8 gap-4">
      <div className="flex flex-col items-center text-center gap-3 w-full">
        <span className="font-bold text-3xl">We are proud</span>
        <span className="font-normal text-sm ">
          We take pride in our achievements and commitment to excellence. Join us in celebrating innovation, growth, and success.
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-8 w-full max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Divider for medium+ screens */}
            {index !== 0 && (
              <div className="hidden md:block w-px bg-[#679BC2] self-stretch"></div>
            )}
            <StatItem {...stat} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Proud;
