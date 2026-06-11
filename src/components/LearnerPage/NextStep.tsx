import { technologies } from "@/data/home"
import { NextSteps, NextStepsMobile } from "@/lib/constants/images"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

export default function NextStep() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#01589A] text-white">
      <div className="md: container mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-4 md:flex-row md:gap-18 md:py-16 lg:gap-36 lg:py-24">
        {/* Text Content Section */}
        <div className="mb-10 rounded-lg p-8 md:mb-0 md:w-1/2">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">What will be next step</h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed">
            Discover our diverse stack of solutions, including software development, data science,
            and cloud tools. Sign up today and kickstart your journey!
          </p>

          {/* Technology Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {technologies.map((tech, index) => {
              return (
                <Link
                  key={index}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "tech-button flex items-center justify-center rounded-lg border px-6 py-3 transition-colors",
                    tech.hoverBg,
                    tech.hoverText
                  )}
                  style={{ borderColor: tech.border }}
                >
                  {tech.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex w-full items-center justify-center rounded-lg px-4 md:w-1/2">
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-md">
            {/* Main Image */}
            <Image
              alt="Device mockup showing website"
              src={NextSteps}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full object-contain"
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
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
