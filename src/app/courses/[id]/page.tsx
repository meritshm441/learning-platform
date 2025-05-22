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
  const { id } = await props.params;
  
  // Fetch courses and handle potential errors
  let courses: Course[] = []
  try {
    const response = (await fetchCourses()) as ApiResponse | Course[] // Explicitly cast to expected type
    if (Array.isArray(response)) {
      courses = response
    } else if (response && (response as ApiResponse).success && Array.isArray((response as ApiResponse).courses)) {
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
    <div className=" w-full flex flex-col min-h-screen ">
      {/* Breadcrumb and Course Header */}
      <div className="bg-[#01589a]  text-white pt-8">
        <div className="w-full mx-auto  px-4 lg:px-48 md:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="mb-6">{course.description}</p>

              {/* Instructor and Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm opacity-80">Instructor</div>
                  <div className="font-semibold">{course.instructor || course.track?.instructor || "John Doe"}</div>
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
            <div className="lg:col-span-1 bg-white">
              <div className=" p-2">
                <Image
                  src={course.image || "/placeholder.svg?height=300&width=400"}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                  unoptimized={course.image?.includes("cloudinary.com")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="w-full  mx-auto px-4 pb-8 lg:px-48 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - What you'll learn */}
          <div className="lg:col-span-2 mt-7">
            <div className="border border-gray-200  rounded-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <ul className="space-y-4 list-disc pl-5 marker:text-[#D9D9D9] marker:w-2 marker:h-2 text-black">
                {learningPoints.map((point) => (
                  <li key={point.id}>{point.text}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Course Details */}
          <div className="lg:col-span-1 ">
            <div className=" overflow-hidden">
              <div className=" p-2 ">
                <h3 className="font-bold border-b border-gray-200">Course Details</h3>
              </div>
              <div className="p-2 ">
                <ul className="space-y-4 font-normal ">
                  <li className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="w-5 h-5  " />
                      <span className="w-24">Duration</span>
                    </div>
                    <span className="font-medium">{course.duration || course.track?.duration || "12 weeks"}</span>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <RiGraduationCapLine className="w-5 h-5 " />
                      <span className="w-24">Track</span>
                    </div>
                    <span className="font-medium">{course.track?.name || "N/A"}</span>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaRegUser className="w-5 h-5  " />
                      <span className="w-24">Instructor</span>
                    </div>
                    <span className="font-medium">{course.instructor || course.track?.instructor || "John Doe"}</span>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt className="w-5 h-5  " />
                      <span className="w-24">Date</span>
                    </div>
                    <span className="font-medium">03/2025</span>
                  </li>
                </ul>

                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold mb-4">${course.price || course.track?.price || 350}.00</div>
                  <Link
                    href={`/checkout?course=${encodeURIComponent(
                      course.title,
                    )}&price=${course.price || course.track?.price || 350}`}
                    className="block w-full bg-[#01589a] text-white py-3 rounded hover:bg-[#115ea5]"
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
          <h2 className="text-xl font-bold mb-6">Explore related courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses
              .filter((relatedCourse: Course) => relatedCourse._id !== id)
              .slice(0, 2)
              .map((relatedCourse: Course) => (
                <div key={relatedCourse._id} className="border border-gray-400  rounded-md overflow-hidden">
                  <div className="grid grid-cols-3">
                    <div className="col-span-1">
                      <Image
                        src={relatedCourse.image || "/placeholder.svg?height=150&width=150"}
                        alt={relatedCourse.title}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                        unoptimized={relatedCourse.image?.includes("cloudinary.com")}
                      />
                    </div>
                    <div className="col-span-2 p-4">
                      <h3 className="font-bold mb-2">{relatedCourse.title}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{relatedCourse.description}</p>
                      <Link
                        href={`/courses/${relatedCourse._id}`}
                        className="text-[#01589a] text-sm font-medium hover:underline"
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
          <div className="w-full  p-6 border border-gray-200 rounded-md text-center">
            <p className="text-gray-500">No related courses available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
