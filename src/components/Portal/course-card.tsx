import { Course } from "@/lib/types/course"
import Image from "next/image"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  // Extract the course name from the title (e.g., "Quick Introduction to ReactJs" -> "ReactJs")
  const courseName = course.title.split(" to ")[1] || course.title.split(" ").pop() || ""

  // Get the short name for the technology (e.g., "ReactJs", "NodeJs")
  const shortName = courseName.replace(/\s+/g, "")

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-[200px] w-full">
        {course.image ? (
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover"
            unoptimized={course.image?.includes("cloudinary.com")}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 text-sm text-gray-600">{shortName}</div>
        <h3 className="mb-2 text-lg font-medium">{course.title}</h3>

        <div className="mt-auto pt-4">
          <div className="font-medium text-[#01589a]">{course.enrollmentStatus}</div>
        </div>
      </div>
    </div>
  )
}
