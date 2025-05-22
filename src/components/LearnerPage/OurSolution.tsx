// components/Solutions/OurSolution.tsx
"use client"

import React, { useEffect, useState } from "react"
import { ourSolutionData } from "@/data/home"
import type { SolutionItem } from "@/lib/models/ourSolutionsItem"
import { SolutionCard } from "./SolutionCard"
import { fetchTracks } from "@/lib/repositories/courses"
import { Track } from "@/lib/types/track"

const OurSolution = () => {
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
  
  return (
    <div className="w-full flex flex-col justify-center items-center py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="flex flex-col items-center justify-center gap-14 w-full max-w-7xl px-[16px] sm:px-[24px] lg:px-[40px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4 w-full max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold md:text-[2.75rem] lg:text-[3.5rem]">
            Our Solution
          </h1>
          <p className="font-normal text-center leading-relaxed max-w-xl mx-auto">
            Create your account quickly with just your email or social media login,
            then explore a wide range.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
          {ourSolutionData.map((solution: SolutionItem) => (
            <SolutionCard key={solution.id} track={solution} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurSolution
