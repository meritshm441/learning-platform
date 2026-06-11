// components/Solutions/OurSolution.tsx
"use client"

import React from "react"
import { ourSolutionData } from "@/data/home"
import type { SolutionItem } from "@/lib/models/ourSolutionsItem"
import { SolutionCard } from "./SolutionCard"

const OurSolution = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-14 px-[16px] sm:px-[24px] lg:px-[40px]">
        {/* Header Section */}
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold md:text-[2.75rem] lg:text-[3.5rem]">Our Solution</h1>
          <p className="mx-auto max-w-xl text-center leading-relaxed font-normal">
            Create your account quickly with just your email or social media login, then explore a
            wide range.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
          {ourSolutionData.map((solution: SolutionItem) => (
            <SolutionCard key={solution.id} track={solution} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurSolution
