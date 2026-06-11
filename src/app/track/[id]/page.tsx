import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchTracks } from "@/lib/repositories/courses"
import { getLearningPoints } from "@/lib/types/course-learning-points"
import { StarRating } from "@/components/Courses/star-rating"
import { FaRegClock, FaRegUser } from "react-icons/fa"
import { RiGraduationCapLine } from "react-icons/ri"
import { FaRegCalendarAlt } from "react-icons/fa"

type TrackDetailPageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<Record<string, string | string[]>>
}

export default async function CourseDetailPage({ params }: TrackDetailPageProps) {
  const { id } = await params

  let tracks: {
    _id: string
    id: string
    name: string
    description: string
    instructor?: string
    image?: string
    duration?: string
    courses?: { _id: string; title: string; image?: string }[]
    price?: number
  }[] = []

  try {
    const response = await fetchTracks()
    if (response?.tracks && Array.isArray(response.tracks)) {
      tracks = response.tracks
    }
  } catch (error) {
    console.error("Error fetching tracks:", error)
  }

  const track = tracks.find((t: { _id: string; id: string }) => t._id === id || t.id === id)
  if (!track) {
    return notFound() // This function throws an error and terminates rendering
  }

  const learningPoints = getLearningPoints(track.name)

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
            <span>{track.name}</span>
          </div>

          {/* Course Title and Description */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="mb-4 text-3xl font-bold">{track.name} Track</h1>
              <p className="mb-6">{track.description}</p>

              {/* Instructor and Stats */}
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm opacity-80">Instructor</div>
                  <div className="font-semibold">{track.instructor || "John Doe"}</div>
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
                  src={track.image || "/placeholder.svg?height=300&width=400"}
                  alt={track.name}
                  width={400}
                  height={300}
                  className="h-auto w-full object-cover"
                  unoptimized={track.image?.includes("cloudinary.com")}
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
                    <span className="font-medium">{track.duration || "12 weeks"}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <RiGraduationCapLine className="h-5 w-5" />
                      <span className="w-24">Courses</span>
                    </div>
                    <span className="font-medium">{track.courses?.length || 4}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-2">
                      <FaRegUser className="h-5 w-5" />
                      <span className="w-24">Instructor</span>
                    </div>
                    <span className="font-medium">{track.instructor || "John Doe"}</span>
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
                  <div className="mb-4 text-2xl font-bold">${track.price || 350}.00</div>
                  <Link
                    href={`/checkout?track=${encodeURIComponent(track.name)}&price=${track.price || 350}`}
                    className="block w-full rounded bg-[#01589a] py-3 text-white hover:bg-[#115ea5]"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      <div className="px-4 pb-8 md:px-20 lg:px-48">
        <h2 className="mb-6 text-xl font-bold">Explore related courses</h2>
        {tracks.filter((relatedTrack) => relatedTrack._id !== id && relatedTrack.id !== id)
          .length === 0 ? (
          <div className="w-full rounded-md border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No related courses available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tracks
              .filter((relatedTrack) => relatedTrack._id !== id && relatedTrack.id !== id)
              .slice(0, 2)
              .map((relatedTrack) => (
                <div
                  key={relatedTrack._id}
                  className="overflow-hidden rounded-md border border-gray-400"
                >
                  <div className="grid grid-cols-3">
                    <div className="col-span-1">
                      <Image
                        src={relatedTrack.image || "/placeholder.svg?height=150&width=150"}
                        alt={relatedTrack.name}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                        unoptimized={relatedTrack.image?.includes("cloudinary.com")}
                      />
                    </div>
                    <div className="col-span-2 p-4">
                      <h3 className="mb-2 font-bold">{relatedTrack.name}</h3>
                      <p className="mb-2 line-clamp-2 text-sm">{relatedTrack.description}</p>
                      <Link
                        href={`/track/${relatedTrack._id}`}
                        className="text-sm font-medium text-[#01589a] hover:underline"
                      >
                        View Track
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
