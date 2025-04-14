import Image from "next/image"
import Link from "next/link"
import { FaClock, FaGraduationCap, FaUserGraduate } from "react-icons/fa6"
import HeroSection from "./HeroSection"
import OurSolution from "./OurSolution"
import NextStep from "./NextStep"
import Proud from "./Proud"
import Investing from "./Investing"
import CourseOnboarding from "./courseOnboarding"

export default function HomePage() {
  return (
    <div className=" min-h-screen w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <HeroSection/>
        <OurSolution/>
        <NextStep/>
        <Proud/>
        <Investing/>
        <CourseOnboarding/>
    </div>
  )
}
