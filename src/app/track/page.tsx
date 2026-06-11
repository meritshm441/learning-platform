"use client"

import { useState, useEffect } from "react"
import { fetchTracks } from "@/lib/repositories/courses"
import type { Track } from "@/lib/types/track"
import { FiAlertCircle } from "react-icons/fi"
import { SearchBar } from "@/components/Courses/search-bar"
import { TrackGrid } from "@/components/track/track-grid"

export default function TracksPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadTracks() {
      try {
        setIsLoading(true)
        const response = await fetchTracks()

        if (!response || typeof response !== "object") {
          throw new Error("Invalid API response")
        }

        let tracksData: Track[] = []
        if (response.success && Array.isArray(response.tracks)) {
          tracksData = response.tracks
        } else if (response.tracks && Array.isArray(response.tracks)) {
          tracksData = response.tracks
        } else {
          throw new Error("No tracks found in API response")
        }

        setTracks(tracksData)
        setFilteredTracks(tracksData)
        console.log(`Successfully processed ${tracksData.length} tracks`)
      } catch (err) {
        console.error("Error in page component:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch courses")
        console.log("Using fallback data due to error")
      } finally {
        setIsLoading(false)
      }
    }

    loadTracks()
  }, [])

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      // If query is empty, show all tracks
      setFilteredTracks(tracks)
      return
    }

    // Filter tracks based on search query
    const lowercaseQuery = query.toLowerCase()
    const filtered = tracks.filter((track) => {
      return (
        track.name.toLowerCase().includes(lowercaseQuery) ||
        track.description.toLowerCase().includes(lowercaseQuery) ||
        track.instructor.toLowerCase().includes(lowercaseQuery)
      )
    })

    setFilteredTracks(filtered)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="w-full bg-[#01589a] py-12 text-center text-white">
        <h1 className="text-3xl font-bold">Tracks</h1>
      </div>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />

        {/* All Tracks */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Tracks</h2>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              {filteredTracks.length} {filteredTracks.length === 1 ? "result" : "results"} for
              &quot;{searchQuery}&quot;
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[#01589a]"></div>
          </div>
        ) : error ? (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
            <div className="flex items-center">
              <FiAlertCircle className="mr-2 h-5 w-5" />
              <p>Error loading courses: {error}</p>
            </div>
          </div>
        ) : filteredTracks.length === 0 ? (
          <div className="mb-4 rounded-md border p-8 text-center">
            <FiAlertCircle className="mx-auto mb-4 h-8 w-8 text-gray-400" />
            <h3 className="mb-2 text-xl font-medium">No courses found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No courses match "${searchQuery}". Try a different search term.`
                : "No courses are currently available. Please check back later."}
            </p>
          </div>
        ) : (
          <TrackGrid tracks={filteredTracks} />
        )}
      </main>
    </div>
  )
}
