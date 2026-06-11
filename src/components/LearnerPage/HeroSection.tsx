import Link from "next/link"
import React from "react"

const HeroSection = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[linear-gradient(to_left,_#01589A00_0%,_#99BCD7_100%),url('/images/homepage.jpg')] bg-cover bg-center px-4 pt-10 text-white sm:px-8 md:px-12 lg:px-48">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:justify-start">
        <div className="flex w-full flex-col items-start justify-start gap-6 lg:w-1/2">
          <div className="flex w-full flex-col gap-3 text-left">
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Unlock Your Potential with Industry-Leading Courses!
            </h1>
            <p className="w-6/7 text-base sm:text-lg">
              &quot;Join thousands of learners gaining real-world skills and advancing their
              careers. Our expert-led courses are designed to empower you to succeed.&quot;
            </p>
          </div>
          <Link
            href="/signup"
            className="rounded bg-[#01589A] px-6 py-2 text-white transition-colors hover:bg-[#014273]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
