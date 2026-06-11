"use client"

import Link from "next/link"
import Image from "next/image"
import type { SolutionItem } from "@/lib/models/ourSolutionsItem"

interface SolutionCardProps {
  track: SolutionItem // Using `track` naming as per your request
}

export function SolutionCard({ track }: SolutionCardProps) {
  return (
    <div className="group rounded-lg border border-gray-50 drop-shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col items-start justify-start gap-4 p-6">
        <div className="flex h-[80px] w-[80px] items-start justify-start">
          <Image
            src={track.icon}
            alt={track.title}
            width={50}
            height={50}
            className="h-full w-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold md:text-[1.25rem] lg:text-xl">
          {track.title || "Untitled Solution"}
        </h2>
        <p className="text-left leading-relaxed font-normal">
          {track.description || "No description available"}
        </p>
        <div className="mt-auto flex w-full items-center justify-between gap-2 font-bold">
          <div className="flex items-center gap-2 text-sm font-normal">
            <span className="font-medium text-gray-400">Price:</span>
            <span>{track.price || "Free"}</span>
          </div>
          <Link
            href={`/track/${track.id}`}
            className="font-normal text-blue-600 transition-colors duration-300 hover:text-blue-800"
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  )
}
