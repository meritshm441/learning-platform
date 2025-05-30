"use client"

import Image from "next/image"
import Link from "next/link"
import { StarRating } from "@/components/Courses/star-rating"
import { useState } from "react"
import { Course } from "@/lib/types/course"

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  // State to course images that failed to load
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const handleImageError = (courseId: string) => {
    setFailedImages((prev) => ({
      ...prev,
      [courseId]: true,
    }))
  }
console.log("courses", courses);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div key={course._id} className="flex flex-col">
          <div className="mb-4 overflow-hidden rounded-md">
            <Image
              src={
                failedImages[course._id]
                  ? "/placeholder.svg?height=200&width=400"
                  : course.image || "/placeholder.svg?height=200&width=400"
              }
              alt={course.title}
              width={400}
              height={200}
              className="object-cover w-full h-[150px]"
              onError={() => handleImageError(course._id)}
              unoptimized={course.image?.includes("cloudinary.com")}
            />
          </div>
          <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
          <p className="mb-4 text-sm text-gray-700">{course.description}</p>
          
          <div className="flex items-center mb-2">
            <StarRating rating={4.0} />
            <span className="ml-2 text-lg font-bold">4.0</span>
            <span className="ml-4 text-gray-500">Price: ${course.price}</span>
          </div>
          <Link
            href={`/courses/${course._id}`}
            className="mt-auto text-center text-white py-3 rounded bg-[#01589a] hover:bg-[#115ea5]"
          >
            Preview course
          </Link>
        </div>
      ))}
    </div>
  )
}
