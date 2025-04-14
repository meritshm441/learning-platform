import { technologies } from "@/data/home";
import { NextSteps, NextStepsMobile } from "@/lib/constants/images";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function NextStep() {
  return (
    <div className="min-h-screen bg-[#01589A] w-full  flex items-center justify-center text-white">
      <div className="container px-4 py-4 md:py-16 lg:py-24 flex flex-col  md:gap-18 gap-5 lg:gap-36 md: md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Text Content Section */}
        <div className="md:w-1/2 mb-10 md:mb-0  rounded-lg p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What will be next step
          </h1>
          <p className="text-lg mb-10 max-w-xl leading-relaxed">
            Discover our diverse stack of solutions, including software
            development, data science, and cloud tools. Sign up today and
            kickstart your journey!
          </p>

          {/* Technology Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => {
              return (
                <Link
                  key={index}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "tech-button px-6 py-3 flex items-center justify-center rounded-lg transition-colors border",
                    tech.hoverBg,
                    tech.hoverText
                  )}
                  style={{ borderColor: tech.border }}
                >
                  {tech.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center rounded-lg px-4">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-md">
            {/* Main Image */}
            <Image
              alt="Device mockup showing website"
              src={NextSteps}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-contain"
              priority
            />

            {/* Overlay Image - relative to parent size */}
            <div className="absolute bottom-[8%] left-[-10%] w-[25%]">
              <Image
                alt="Mobile device overlay"
                src={NextStepsMobile}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
