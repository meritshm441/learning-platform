"use client"

import { FaTimes } from "react-icons/fa"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type LearnerDetailsModalProps = {
  isOpen: boolean
  onClose: () => void
  learner: {
    name: string
    email: string
    program: string
    gender: string
    contact: string
    location: string
    paid: string
    bio: string
    avatar?: string
  }
}

export function LearnerDetailsModal({ isOpen, onClose, learner }: LearnerDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white dark:bg-[#1d1b20]">
        <div className="flex justify-end bg-[#01589a] p-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <FaTimes />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={learner.avatar || "/placeholder.svg?height=128&width=128&query=person"}
                alt={learner.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{learner.name}</h2>
            <p className="text-gray-500">{learner.email}</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Program</h3>
                <p>{learner.program}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Gender</h3>
                <p>{learner.gender}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Contact</h3>
                <p>{learner.contact}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Location</h3>
                <p>{learner.location}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-500">Paid</h3>
              <p>{learner.paid}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-500">Bio</h3>
              <p>{learner.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
