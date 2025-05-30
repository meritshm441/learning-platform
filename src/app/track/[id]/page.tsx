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

export default async function CourseDetailPage({ params, searchParams }: TrackDetailPageProps) {
  const { id } = await params
  const search = await searchParams
    
    let tracks: {
        _id: string
        id: string
        name: string
        description: string
        instructor?: string
        image?: string
        duration?: string
        courses?: any[]
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
        <div className="w-full flex flex-col min-h-screen">
            {/* Breadcrumb and Course Header */}
            <div className="bg-[#01589a] text-white pt-8">
                <div className="w-full mx-auto px-4 lg:px-48 md:px-20">
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
                        <span>{track.name}</span>
                    </div>
                    
                    {/* Course Title and Description */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-bold mb-4">{track.name} Track</h1>
                            <p className="mb-6">{track.description}</p>
                            
                            {/* Instructor and Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
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
                        <div className="lg:col-span-1 bg-white">
                            <div className="p-2">
                                <Image
                                    src={track.image || "/placeholder.svg?height=300&width=400"}
                                    alt={track.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                    unoptimized={track.image?.includes("cloudinary.com")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Course Content */}
            <div className="w-full mx-auto px-4 pb-8 lg:px-48 md:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - What you'll learn */}
                    <div className="lg:col-span-2 mt-7">
                        <div className="border border-gray-200 rounded-md p-6 mb-8">
                            <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
                            <ul className="space-y-4 list-disc pl-5 marker:text-[#D9D9D9] marker:w-2 marker:h-2 text-black">
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
                                <h3 className="font-bold border-b border-gray-200">Course Details</h3>
                            </div>
                            <div className="p-2">
                                <ul className="space-y-4 font-normal">
                                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FaRegClock className="w-5 h-5" />
                                            <span className="w-24">Duration</span>
                                        </div>
                                        <span className="font-medium">{track.duration || "12 weeks"}</span>
                                    </li>
                                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <RiGraduationCapLine className="w-5 h-5" />
                                            <span className="w-24">Courses</span>
                                        </div>
                                        <span className="font-medium">{track.courses?.length || 4}</span>
                                    </li>
                                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FaRegUser className="w-5 h-5" />
                                            <span className="w-24">Instructor</span>
                                        </div>
                                        <span className="font-medium">{track.instructor || "John Doe"}</span>
                                    </li>
                                    <li className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FaRegCalendarAlt className="w-5 h-5" />
                                            <span className="w-24">Date</span>
                                        </div>
                                        <span className="font-medium">03/2025</span>
                                    </li>
                                </ul>
                                <div className="mt-6 text-center">
                                    <div className="text-2xl font-bold mb-4">${track.price || 350}.00</div>
                                    <Link
                                        href={`/checkout?track=${encodeURIComponent(track.name)}&price=${track.price || 350}`}
                                        className="block w-full bg-[#01589a] text-white py-3 rounded hover:bg-[#115ea5]"
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
            <div>
                <h2 className="text-xl font-bold mb-6">Explore related courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tracks
                        .filter((relatedTrack: any) => relatedTrack._id !== id && relatedTrack.id !== id)
                        .slice(0, 2)
                        .map((relatedTrack: any) => (
                            <div key={relatedTrack._id} className="border border-gray-400 rounded-md overflow-hidden">
                                <div className="grid grid-cols-3">
                                    <div className="col-span-1">
                                        <Image
                                            src={relatedTrack.image || "/placeholder.svg?height=150&width=150" || "/placeholder.svg"}
                                            alt={relatedTrack.name}
                                            width={150}
                                            height={150}
                                            className="w-full h-full object-cover"
                                            unoptimized={relatedTrack.image?.includes("cloudinary.com")}
                                        />
                                    </div>
                                    <div className="col-span-2 p-4">
                                        <h3 className="font-bold mb-2">{relatedTrack.name}</h3>
                                        <p className="text-sm mb-2 line-clamp-2">{relatedTrack.description}</p>
                                        <Link
                                            href={`/track/${relatedTrack._id}`}
                                            className="text-[#01589a] text-sm font-medium hover:underline"
                                        >
                                            View Track
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            
            {/* Show a message if no related courses are available */}
            {tracks.filter((relatedTrack: any) => relatedTrack._id !== id && relatedTrack.id !== id)
                .length === 0 && (
                <div className="w-full p-6 border border-gray-200 rounded-md text-center">
                    <p className="text-gray-500">No related courses available at this time.</p>
                </div>
            )}
        </div>
    )
}