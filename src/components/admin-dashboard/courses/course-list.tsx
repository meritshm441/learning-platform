"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaSearch, FaPlus, FaArrowRight, FaSpinner, FaExclamationTriangle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { formatDate } from "@/lib/constants/utils"
import { coursesApi } from "@/lib/services/api"

// Mock data to use as fallback when API is unavailable
const MOCK_COURSES = [
  {
    _id: "course-1",
    title: "AWS Cloud Practitioner",
    track: {
      _id: "track-2",
      name: "Cloud Computing Expertise",
    },
    stacks: ["S3", "EC2", "CloudFront", "EKS"],
    image: "/placeholder.svg?height=192&width=384",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "course-2",
    title: "React & Next.js Development",
    track: {
      _id: "track-1",
      name: "Software Engineering Track",
    },
    stacks: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=192&width=384",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "course-3",
    title: "Machine Learning Fundamentals",
    track: {
      _id: "track-3",
      name: "Data Science Mastery",
    },
    stacks: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
    image: "/placeholder.svg?height=192&width=384",
    createdAt: new Date().toISOString(),
  },
]

type Course = {
  _id: string
  title: string
  track: {
    _id: string
    name: string
  }
  stacks: string[]
  image?: string
  createdAt: string
}

export function CoursesList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES)
  const [isLoading, setIsLoading] = useState(false)
  const [usingMockData, setUsingMockData] = useState(true)

  const fetchCourses = async () => {
    setIsLoading(true)
    setUsingMockData(false)

    try {
      const response = await coursesApi.getAll()
      setCourses(response.courses || [])
    } catch (err) {
      console.error("Error fetching courses:", err)

      // Fallback to mock data
      setCourses(MOCK_COURSES)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.track?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.stacks.some((stack) => stack.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <FaSpinner className="h-8 w-8 animate-spin text-[#01589a]" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Courses</h1>

      {usingMockData && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-900/30 dark:bg-yellow-900/20">
          <FaExclamationTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle>API Connection Failed</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Using mock data for demonstration purposes. The API server might be unavailable.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCourses}
              className="ml-4 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-900/30"
            >
              Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 flex justify-between">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search Courses"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button
          className="bg-[#01589a] hover:bg-[#01589a]/90"
          onClick={() => router.push("/admin/courses/create")}
        >
          <FaPlus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center dark:bg-[#1d1b20]">
          <p className="text-gray-500">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-[#1d1b20]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg?height=192&width=384"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                <p className="mb-4 text-gray-500">Track: {course.track?.name || "N/A"}</p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium">Stacks:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.stacks?.map((stack, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-[#f5f5f5] dark:bg-[#404040]"
                      >
                        {stack}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex justify-between text-sm text-gray-500">
                  <span>Created: {formatDate(course.createdAt)}</span>
                </div>

                <Button
                  variant="outline"
                  className="mt-2 flex w-full items-center justify-center gap-2 border-[#01589a] text-[#01589a]"
                  onClick={() => router.push(`/admin/courses/${course._id}`)}
                >
                  View more <FaArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
