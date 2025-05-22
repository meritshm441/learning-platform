import { Course } from "@/lib/types/course"
import { FiChevronRight } from "react-icons/fi"
import { CourseCard } from "./course-card"

interface CategorySectionProps {
  title: string
  courses: Course[]
}

export function CategorySection({ title, courses }: CategorySectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}

        {courses.length > 4 && (
          <button
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            aria-label="Next courses"
          >
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )
}
