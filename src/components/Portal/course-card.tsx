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
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
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
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-600 mb-1">{shortName}</div>
        <h3 className="font-medium text-lg mb-2">{course.title}</h3>

        <div className="mt-auto pt-4">
          <div className="text-[#01589a] font-medium">{course.enrollmentStatus}</div>
        </div>
      </div>
    </div>
  )
}
