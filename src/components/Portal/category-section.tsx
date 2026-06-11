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
      <h2 className="mb-6 text-xl font-bold">{title}</h2>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}

        {courses.length > 4 && (
          <button
            className="absolute top-1/2 -right-4 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
            aria-label="Next courses"
          >
            <FiChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )
}
