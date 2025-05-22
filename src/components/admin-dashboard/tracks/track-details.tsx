"use client"

import { useRouter } from "next/navigation"
import { FaArrowLeft, FaEdit } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type TrackDetailsProps = {
  id: string
}

export function TrackDetails({ id }: TrackDetailsProps) {
  const router = useRouter()

  // Mock data - would be fetched from API in real implementation
  const track = {
    id,
    title: "Software Engineering Track",
    price: "$ 380.00",
    duration: "12 weeks",
    instructor: "Benjamin",
    date: "07 Jan, 2025",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "/software-development-collaboration.png",
    stacks: ["ReactJs", "NextJs", "NodeJs", "Django", "MongoDB", "VueJs"],
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-gray-500">Tracks</h1>
        <span>/</span>
        <h1 className="text-2xl font-bold">details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1d1b20] rounded-lg overflow-hidden shadow-sm">
            <div className="h-64 overflow-hidden">
              <img src={track.image || "/placeholder.svg"} alt={track.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{track.title}</h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">{track.price}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{track.duration}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Instructor</span>
                  <span className="font-medium">{track.instructor}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{track.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#1d1b20] rounded-lg p-6 shadow-sm h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{track.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Stacks</h3>
              <div className="flex flex-wrap gap-2">
                {track.stacks.map((stack, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 border-[#01589a] text-[#01589a]">
                    {stack}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => router.back()}
>
                <FaArrowLeft className="h-4 w-4" /> Back
              </Button>

              <Button
                className="bg-[#01589a] hover:bg-[#01589a]/90 flex items-center gap-2"
                onClick={() => router.push(`/tracks/edit/${id}`)}
              >
                <FaEdit className="h-4 w-4" /> Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
