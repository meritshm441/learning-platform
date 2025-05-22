"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus, FaSpinner, FaExclamationTriangle } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { learnersApi } from "@/lib/services/api"

// Mock data to use as fallback when API is unavailable
const MOCK_LEARNERS = [
  {
    _id: "learner-1",
    firstName: "Jane",
    lastName: "Cooper",
    email: "jane.cooper@example.com",
    role: "Learner",
    isVerified: true,
    contact: "+1234567890",
    location: "New York, USA",
    disabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "learner-2",
    firstName: "Savannah",
    lastName: "Nguyen",
    email: "savannah.nguyen@example.com",
    role: "Learner",
    isVerified: true,
    contact: "+2345678901",
    location: "Los Angeles, USA",
    disabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "learner-3",
    firstName: "Jerome",
    lastName: "Bell",
    email: "jerome.bell@example.com",
    role: "Learner",
    isVerified: true,
    contact: "+3456789012",
    location: "Chicago, USA",
    disabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "learner-4",
    firstName: "Theresa",
    lastName: "Webb",
    email: "theresa.webb@example.com",
    role: "Learner",
    isVerified: true,
    contact: "+4567890123",
    location: "Miami, USA",
    disabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "learner-5",
    firstName: "Ralph",
    lastName: "Edwards",
    email: "ralph.edwards@example.com",
    role: "Learner",
    isVerified: true,
    contact: "+5678901234",
    location: "Seattle, USA",
    disabled: false,
    createdAt: new Date().toISOString(),
  },
]

type Learner = {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isVerified: boolean
  contact?: string
  location?: string
  disabled?: boolean
  profileImage?: string
  createdAt: string
}

export function LearnersList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [learners, setLearners] = useState<Learner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  const fetchLearners = async () => {
    setIsLoading(true)
    setError(null)
    setUsingMockData(false)

    try {
      const response = await learnersApi.getAll()
      setLearners(response.learners || [])
    } catch (err) {
      console.error("Error fetching learners:", err)
      setError("Failed to connect to the API. Using mock data instead.")

      // Fallback to mock data
      setLearners(MOCK_LEARNERS)
      setUsingMockData(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLearners()
  }, [])

  const filteredLearners = learners.filter(
    (learner) =>
      learner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learner.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort learners based on selected option
  const sortedLearners = [...filteredLearners].sort((a, b) => {
    if (sortBy === "name") {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email)
    } else if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return 0
  })

  const handleViewLearner = (id: string) => {
    router.push(`/admin/learners/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <FaSpinner className="h-8 w-8 animate-spin text-[#01589a]" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Learners</h1>

      {usingMockData && (
        <Alert className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30">
          <FaExclamationTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
          <AlertTitle>API Connection Failed</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Using mock data for demonstration purposes. The API server might be unavailable.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLearners}
              className="ml-4 border-yellow-600 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-900/30"
            >
              Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search learners"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-[#01589a] hover:bg-[#01589a]/90" onClick={() => router.push("/admin/learners/create")}>
            <FaPlus className="mr-2 h-4 w-4" /> Create learner
          </Button>
        </div>
      </div>

      {sortedLearners.length === 0 ? (
        <div className="bg-white dark:bg-[#1d1b20] rounded-lg p-8 text-center">
          <p className="text-gray-500">No learners found</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1d1b20] rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 bg-[#f5f5f5] dark:bg-[#404040] font-medium">
            <div>Learner</div>
            <div>Email</div>
            <div>Contact</div>
            <div>Location</div>
            <div>Actions</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedLearners.map((learner) => (
              <div key={learner._id} className="grid grid-cols-5 gap-4 p-4 items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    {learner.profileImage ? (
                      <AvatarImage
                        src={learner.profileImage || "/placeholder.svg"}
                        alt={`${learner.firstName} ${learner.lastName}`}
                      />
                    ) : (
                      <AvatarFallback className="bg-[#01589a] text-white">
                        {learner.firstName?.[0]}
                        {learner.lastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>
                    {learner.firstName} {learner.lastName}
                  </span>
                </div>
                <div>{learner.email}</div>
                <div>{learner.contact || "N/A"}</div>
                <div>{learner.location || "N/A"}</div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-blue-100 text-blue-600"
                    onClick={() => handleViewLearner(learner._id)}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-green-100 text-green-600"
                    onClick={() => router.push(`/admin/learners/edit/${learner._id}`)}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-100 text-red-600">
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
