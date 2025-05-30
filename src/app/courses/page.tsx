"use client"

import { useState, useEffect } from "react"
import { CourseGrid } from "@/components/Courses/course-grid"
import { fetchCourses } from "@/lib/repositories/courses"
import { FiAlertCircle, FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { SearchBar } from "@/components/Courses/search-bar"
import type { Course } from "@/lib/types/course"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadCourses() {
      try {
        setIsLoading(true)
        // fetchCourses returns Course[]
        const coursesData: Course[] = await fetchCourses()
        setCourses(coursesData)
        setFilteredCourses(coursesData) // Initialize filteredCourses with all courses
        console.log(`Loaded ${coursesData.length} courses`)
      } catch (err) {
        console.error("Failed to load courses:", err)
        setError(err instanceof Error ? err.message : "Unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [])

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      // If query is empty, show all courses
      setFilteredCourses(courses)
      return
    }

    // Filter courses based on search query
    const lowercaseQuery = query.toLowerCase()
    const filtered = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.track.name.toLowerCase().includes(lowercaseQuery) || // Added track name to search
        course.track.instructor?.toLowerCase().includes(lowercaseQuery) // Added instructor name to search
      )
    })

    setFilteredCourses(filtered)
  }

  console.log("Filtered courses:", filteredCourses);
  

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <div className="w-full py-12 text-center text-white bg-[#01589a]">
        <h1 className="text-3xl font-bold">Courses</h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:px-8 max-w-7xl mx-auto w-full">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

        {/* All Courses */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">All Courses</h2>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              {filteredCourses.length} {filteredCourses.length === 1 ? "result" : "results"} for "{searchQuery}"
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01589a]"></div>
          </div>
        ) : error ? (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              <p>Error loading courses: {error}</p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-8 mb-4 text-center border rounded-md">
            <FiAlertCircle className="w-8 h-8 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No courses match "${searchQuery}". Try a different search term.`
                : "No courses are currently available. Please check back later."}
            </p>
          </div>
        ) : (
          <CourseGrid courses={filteredCourses} />
        )}
      </main>
    </div>
  )
}