import React from "react"
import { FaClock, FaGraduationCap, FaUserGraduate } from "react-icons/fa6"

const stats = [
  {
    icon: <FaGraduationCap className="mb-4 h-20 w-20 text-[#679BC2]" />,
    value: "4+",
    label: "Courses",
  },
  {
    icon: <FaUserGraduate className="mb-4 h-20 w-20 text-[#679BC2]" />,
    value: "200+",
    label: "Course students",
  },
  {
    icon: <FaClock className="mb-4 h-20 w-20 text-[#679BC2]" />,
    value: "250+",
    label: "Hours of content",
  },
]

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) => (
  <div className="flex w-full flex-col items-center justify-center text-center">
    {icon}
    <h2 className="text-5xl font-bold text-[#679BC2] sm:text-6xl">{value}</h2>
    <p className="mt-2 text-xl font-medium text-black sm:text-2xl">{label}</p>
  </div>
)

const Proud = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[#F9FAFB] px-4 py-5 sm:px-6 md:gap-8 md:py-10 lg:gap-16 lg:px-10 lg:py-20">
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <span className="text-3xl font-bold">We are proud</span>
        <span className="text-sm font-normal">
          We take pride in our achievements and commitment to excellence. Join us in celebrating
          innovation, growth, and success.
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-stretch">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {/* Divider for medium+ screens */}
            {index !== 0 && <div className="hidden w-px self-stretch bg-[#679BC2] md:block"></div>}
            <StatItem {...stat} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Proud
