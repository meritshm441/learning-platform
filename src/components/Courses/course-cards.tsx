import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"
import type { Track } from "@/lib/types/track"

interface CourseCardProps {
  track: Track
}

export function CourseCard({ track }: CourseCardProps) {
  // Add safety checks for track properties
  if (!track) {
    return null
  }

  return (
    <div className="flex flex-col overflow-hidden border rounded-md">
      <Link href={`/courses/${track._id}`} className="group">
        <div className="relative h-48 bg-gray-100">
          {track.image ? (
            <Image
              src={track.image || "/placeholder.svg"}
              alt={track.name || "Course image"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/courses/${track._id}`} className="group">
          <h3 className="mb-2 text-lg font-bold group-hover:text-[#01589a] transition-colors">
            {track.name || "Untitled Course"}
          </h3>
        </Link>
        <p className="mb-4 text-sm text-[#666666] line-clamp-2">{track.description || "No description available"}</p>
        <div className="flex items-center mt-auto mb-2">
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <FaStar key={i} className="w-4 h-4 fill-[#d89614] text-[#d89614]" />
            ))}
            <FaStar className="w-4 h-4 text-[#d89614]" />
          </div>
          <span className="ml-1 text-sm font-medium">4.0</span>
          <span className="ml-auto text-sm text-[#666666]">
            Price: <span className="font-medium">${track.price || 0}</span>
          </span>
        </div>
        <Link href={`/courses/${track._id}`} className="block w-full">
          <button className="w-full py-2 mt-2 text-sm font-medium text-white rounded bg-[#01589a] hover:bg-[#014a82] transition-colors">
            Preview course
          </button>
        </Link>
      </div>
    </div>
  )
}
