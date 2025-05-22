"use client"

import { FaTimes } from "react-icons/fa"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1d1b20] w-full max-w-2xl rounded-lg overflow-hidden">
        <div className="bg-[#01589a] p-4 flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <FaTimes />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <img
                src={learner.avatar || "/placeholder.svg?height=128&width=128&query=person"}
                alt={learner.name}
                className="w-full h-full object-cover"
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
