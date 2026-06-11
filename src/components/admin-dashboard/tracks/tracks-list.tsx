"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaSearch, FaPlus, FaArrowRight, FaSpinner, FaExclamationTriangle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { tracksApi } from "@/lib/services/api"
import { formatDate } from "@/lib/constants/utils"

// Mock data to use as fallback when API is unavailable
const MOCK_TRACKS = [
  {
    _id: "track-1",
    name: "Software Engineering Track",
    price: 350,
    instructor: "John Doe",
    duration: "12 weeks",
    image: "/placeholder.svg?height=192&width=384",
    description:
      "Comprehensive training in modern software development covering full-stack web development.",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "track-2",
    name: "Cloud Computing Expertise",
    price: 380,
    instructor: "Williams",
    duration: "12 weeks",
    image: "/placeholder.svg?height=192&width=384",
    description: "Master cloud computing with AWS, Azure, and Google Cloud Platform.",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "track-3",
    name: "Data Science Mastery",
    price: 380,
    instructor: "Enoch",
    duration: "12 weeks",
    image: "/placeholder.svg?height=192&width=384",
    description: "Learn data science, machine learning, and AI with Python and R.",
    createdAt: new Date().toISOString(),
  },
]

type Track = {
  _id: string
  name: string
  price: number
  instructor: string
  duration: string
  image?: string
  description: string
  createdAt: string
}

export function TracksList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS)
  const [isLoading, setIsLoading] = useState(false)
  const [usingMockData, setUsingMockData] = useState(false)

  const fetchTracks = async () => {
    setIsLoading(true)
    setUsingMockData(false)

    try {
      const response = await tracksApi.getAll()
      setTracks(response.tracks || [])
    } catch (err) {
      console.error("Error fetching tracks:", err)

      // Fallback to mock data
      setTracks(MOCK_TRACKS)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTracks = tracks.filter(
    (track) =>
      track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h1 className="mb-6 text-2xl font-bold">Tracks</h1>

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
              onClick={fetchTracks}
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
            placeholder="Search Tracks"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button
          className="bg-[#01589a] hover:bg-[#01589a]/90"
          onClick={() => router.push("/admin/tracks/create")}
        >
          <FaPlus className="mr-2 h-4 w-4" /> Create Track
        </Button>
      </div>

      {filteredTracks.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center dark:bg-[#1d1b20]">
          <p className="text-gray-500">No tracks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTracks.map((track) => (
            <div
              key={track._id}
              className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-[#1d1b20]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={track.image || "/placeholder.svg?height=192&width=384"}
                  alt={track.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="mb-4 text-xl font-bold">{track.name}</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">${track.price}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{track.duration}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium">{track.instructor}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">{formatDate(track.createdAt)}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-4 flex w-full items-center justify-center gap-2 border-[#01589a] text-[#01589a]"
                  onClick={() => router.push(`/admin/tracks/${track._id}`)}
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
