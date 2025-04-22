import { CourseGrid } from "@/components/Courses/course-grid"
import { fetchTracks } from "@/lib/repositories/courses"
import type { Track } from "@/lib/types/track"
import { CiSearch } from "react-icons/ci"
import { FiAlertCircle } from "react-icons/fi"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"

export default async function CoursesPage() {
  let tracks: Track[] = []
  let error = null

  try {
    // Fetch the tracks data
    const response = await fetchTracks()

    // Check if response exists and has the expected structure
    if (!response || typeof response !== "object") {
      throw new Error("Invalid API response")
    }

    // Check if the response has a tracks property and it's an array
    if (response.success && Array.isArray(response.tracks)) {
      tracks = response.tracks
    } else if (response.tracks && Array.isArray(response.tracks)) {
      // Fallback if success flag is missing but tracks exists
      tracks = response.tracks
    } else {
      throw new Error("No tracks found in API response")
    }

    // Log the processed tracks
    console.log(`Successfully processed ${tracks.length} tracks`)
  } catch (err) {
    console.error("Error in page component:", err)
    error = err instanceof Error ? err.message : "Failed to fetch courses"
    // Don't show the error to the user, just log it
    // We'll use the fallback data from fetchTracks instead
    console.log("Using fallback data due to error")
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <div className="w-full py-12 text-center text-white bg-[#01589a]">
        <h1 className="text-3xl font-bold">Courses</h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:px-8 max-w-7xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search course"
            className="w-full px-4 py-3 pl-10 bg-[#f5f5f5] rounded border-none focus:outline-none"
          />
          <CiSearch className="absolute w-5 h-5 text-[#999999] left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* All Courses */}
        <h2 className="mb-8 text-2xl font-bold">All Courses</h2>

        {error ? (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              <p>Error loading courses: {error}</p>
            </div>
          </div>
        ) : tracks.length === 0 ? (
          <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-md">
            <p>No courses found. Please check back later.</p>
          </div>
        ) : (
          <CourseGrid tracks={tracks} />
        )}
      </main>

    </div>
  )
}
