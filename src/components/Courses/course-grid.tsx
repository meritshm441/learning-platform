"use client"

import Image from "next/image"
import Link from "next/link"
import type { Track } from "@/lib/types/track"
import { StarRating } from "@/components/Courses/star-rating"
import { useState } from "react"

interface CourseGridProps {
  tracks: Track[]
}

export function CourseGrid({ tracks }: CourseGridProps) {
  // State to track images that failed to load
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const handleImageError = (trackId: string) => {
    setFailedImages((prev) => ({
      ...prev,
      [trackId]: true,
    }))
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => (
        <div key={track._id} className="flex flex-col">
          <div className="mb-4 overflow-hidden rounded-md">
            <Image
              src={
                failedImages[track._id]
                  ? "/placeholder.svg?height=200&width=400"
                  : track.image || "/placeholder.svg?height=200&width=400"
              }
              alt={track.name}
              width={400}
              height={200}
              className="object-cover w-full h-[150px]"
              onError={() => handleImageError(track._id)}
              unoptimized={track.image?.includes("cloudinary.com")}
            />
          </div>
          <h3 className="mb-2 text-xl font-bold">{track.name}</h3>
          <p className="mb-4 text-sm text-gray-700">{track.description}</p>
          <div className="flex items-center mb-2">
            <StarRating rating={4.0} />
            <span className="ml-2 text-lg font-bold">4.0</span>
            <span className="ml-4 text-gray-500">Price: ${track.price}</span>
          </div>
          <Link
            href={`/courses/${track._id}`}
            className="mt-auto text-center text-white py-3 rounded bg-[#01589a] hover:bg-[#115ea5]"
          >
            Preview course
          </Link>
        </div>
      ))}
    </div>
  )
}
