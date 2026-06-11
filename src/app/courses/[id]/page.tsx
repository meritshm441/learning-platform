import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchCourses } from "@/lib/repositories/courses" // Make sure this is correctly implemented
import { getLearningPoints } from "@/lib/types/course-learning-points"
import { StarRating } from "@/components/Courses/star-rating"
import { FaRegClock, FaRegUser } from "react-icons/fa6"
import { RiGraduationCapLine } from "react-icons/ri"
import { FaRegCalendarAlt } from "react-icons/fa"

// Use the shared Course interface from your types
import type { Course } from "@/lib/types/course"

// Define the ApiResponse interface to match the expected response from fetchCourses
interface ApiResponse {
  success: boolean
  count: number
  courses: Course[]
}

export default async function CourseDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  // Fetch courses and handle potential errors
  let courses: Course[] = []
  try {
    const response = (await fetchCourses()) as ApiResponse | Course[] // Explicitly cast to expected type
    if (Array.isArray(response)) {
      courses = response
    } else if (
      response &&
      (response as ApiResponse).success &&
      Array.isArray((response as ApiResponse).courses)
    ) {
      courses = (response as ApiResponse).courses
    } else {
      console.error("Failed to fetch courses:", response)
      // Consider throwing an error or showing a user-friendly message
      notFound() // Or handle the error as appropriate for your application
    }
  } catch (error) {
    console.error("Error fetching courses:", error)
    // Handle the error (e.g., show a message, redirect)
    notFound()
  }

  // Find the course with the matching ID
  const course = courses.find((c) => c._id === id)

  // If course not found, return 404
  if (!course) {
    notFound()
  }

  // Get learning points based on course track name
  const learningPoints = getLearningPoints(course.track?.name || course.title)

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Breadcrumb and Course Header */}
      <div className="bg-[#01589a] pt-8 text-white">
        <div className="mx-auto w-full px-4 md:px-20 lg:px-48">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/courses" className="hover:underline">
              courses
            </Link>
            <span>›</span>
            <span>{course.title}</span>
          </div>

          {/* Course Title and Description */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="mb-4 text-3xl font-bold">{course.title}</h1>
              <p className="mb-6">{course.description}</p>

              {/* Instructor and Stats */}
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm opacity-80">Instructor</div>
                  <div className="font-semibold">
                    {course.instructor || course.track?.instructor || "John Doe"}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Enrolled students</div>
                  <div className="font-semibold">50</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">1 review</div>
                  <div className="flex">
                    <StarRating rating={4} />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-white lg:col-span-1">
              <div className="p-2">
                <Image
                  src={course.image || "/placeholder.svg?height=300&width=400"}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="h-auto w-full object-cover"
                  unoptimized={course.image?.includes("cloudinary.com")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto w-full px-4 pb-8 md:px-20 lg:px-48">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - What you'll learn */}
          <div className="mt-7 lg:col-span-2">
            <div className="mb-8 rounded-md border border-gray-200 p-6">
              <h2 className="mb-4 text-xl font-bold">What you&apos;ll learn</h2>
              <ul className="list-disc space-y-4 pl-5 text-black marker:h-2 marker:w-2 marker:text-[#D9D9D9]">
                {learningPoints.map((point) => (
                  <li key={point.id}>{point.text}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Course Details */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden">
              <div className="p-2">
                <h3 className="border-b border-gray-200 font-bold">Course Details</h3>
              </div>
              <div className="p-2">
                <ul className="space-y-4 font-normal">
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="h-5 w-5" />
                      <span className="w-24">Duration</span>
                    </div>
                    <span className="font-medium">
                      {course.duration || course.track?.duration || "12 weeks"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <RiGraduationCapLine className="h-5 w-5" />
                      <span className="w-24">Track</span>
                    </div>
                    <span className="font-medium">{course.track?.name || "N/A"}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegUser className="h-5 w-5" />
                      <span className="w-24">Instructor</span>
                    </div>
                    <span className="font-medium">
                      {course.instructor || course.track?.instructor || "John Doe"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt className="h-5 w-5" />
                      <span className="w-24">Date</span>
                    </div>
                    <span className="font-medium">03/2025</span>
                  </li>
                </ul>

                <div className="mt-6 text-center">
                  <div className="mb-4 text-2xl font-bold">
                    ${course.price || course.track?.price || 350}.00
                  </div>
                  <Link
                    href={`/checkout?course=${encodeURIComponent(
                      course.title
                    )}&price=${course.price || course.track?.price || 350}&trackId=${course.track?.id}`}
                    className="block w-full rounded bg-[#01589a] py-3 text-white hover:bg-[#115ea5]"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related Courses */}
        <div>
          <h2 className="mb-6 text-xl font-bold">Explore related courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses
              .filter((relatedCourse: Course) => relatedCourse._id !== id)
              .slice(0, 2)
              .map((relatedCourse: Course) => (
                <div
                  key={relatedCourse._id}
                  className="overflow-hidden rounded-md border border-gray-400"
                >
                  <div className="grid grid-cols-3">
                    <div className="col-span-1">
                      <Image
                        src={relatedCourse.image || "/placeholder.svg?height=150&width=150"}
                        alt={relatedCourse.title}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                        unoptimized={relatedCourse.image?.includes("cloudinary.com")}
                      />
                    </div>
                    <div className="col-span-2 p-4">
                      <h3 className="mb-2 font-bold">{relatedCourse.title}</h3>
                      <p className="mb-2 line-clamp-2 text-sm">{relatedCourse.description}</p>
                      <Link
                        href={`/courses/${relatedCourse._id}`}
                        className="text-sm font-medium text-[#01589a] hover:underline"
                      >
                        View course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Show a message if no related courses are available */}
        {courses.filter((relatedCourse: Course) => relatedCourse._id !== id).length === 0 && (
          <div className="w-full rounded-md border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No related courses available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
