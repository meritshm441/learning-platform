"use client"

import Link from "next/link"
import Image from "next/image"
import { FaStar } from "react-icons/fa"
import type { SolutionItem } from "@/lib/models/ourSolutionsItem"

interface SolutionCardProps {
  track: SolutionItem // Using `track` naming as per your request
}

export function SolutionCard({ track }: SolutionCardProps) {
  return (
    <div className="group rounded-lg drop-shadow-xl border border-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col items-start justify-start gap-4 p-6">
        <div className="flex items-start justify-start w-[80px] h-[80px]">
          <Image
            src={track.icon}
            alt={track.title}
            width={50}
            height={50}
            className="object-contain w-full h-full"
          />
        </div>
        <h2 className="text-xl font-bold md:text-[1.25rem] lg:text-xl">
          {track.title || "Untitled Solution"}
        </h2>
        <p className="font-normal text-left leading-relaxed">
          {track.description || "No description available"}
        </p>
        <div className="flex items-center justify-between gap-2 font-bold w-full mt-auto">
          <div className="flex items-center gap-2 font-normal text-sm">
            <span className="font-medium text-gray-400">Price:</span>
            <span>{track.price || "Free"}</span>
          </div>
          <Link
            href={`/track/${track.id}`}
            className="text-blue-600 font-normal hover:text-blue-800 transition-colors duration-300"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  )
}
