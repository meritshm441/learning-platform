import Link from 'next/link'
import React from 'react'

const HeroSection = () => {

  return (
    <div className="bg-[linear-gradient(to_left,_#01589A00_0%,_#99BCD7_100%),url('/images/homepage.jpg')] bg-cover bg-center min-h-screen w-full flex items-center justify-center text-white px-4 sm:px-8 md:px-12 lg:px-48 pt-10">
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-8">
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start gap-6">
          <div className="flex flex-col gap-3 text-left w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Unlock Your Potential with Industry-Leading Courses!
            </h1>
            <p className="text-base sm:text-lg w-6/7 ">
              "Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are designed to empower you to succeed."
            </p>
          </div>
          <Link href="/signup" className="bg-[#01589A] text-white px-6 py-2 rounded hover:bg-[#014273] transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
