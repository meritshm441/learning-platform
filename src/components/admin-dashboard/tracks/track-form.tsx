"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaGraduationCap, FaDollarSign, FaUser, FaClock, FaImage, FaPen } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TrackFormProps = {
  mode: "create" | "update"
  initialData?: {
    title: string
    price: string
    instructor: string
    duration: string
    description: string
  }
}

export function TrackForm({ mode, initialData }: TrackFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    price: initialData?.price || "",
    instructor: initialData?.instructor || "",
    duration: initialData?.duration || "",
    description: initialData?.description || "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/tracks")
  }

  const title = mode === "create" ? "Create Track" : "Update Track"
  const buttonText = mode === "create" ? "Create Track" : "Update"

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <h1 className="text-gray-500">Tracks</h1>
        <span>/</span>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="rounded-lg bg-[#f9f9f9] p-6 dark:bg-[#1d1b20]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative">
              <div className="absolute top-1/2 left-3 text-gray-400">
                <FaGraduationCap />
              </div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                className="pl-10"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-3 text-gray-400">
                <FaDollarSign />
              </div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                className="pl-10"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-3 text-gray-400">
              <FaUser />
            </div>
            <Label htmlFor="instructor">Instructor</Label>
            <Input
              id="instructor"
              className="pl-10"
              value={formData.instructor}
              onChange={(e) => handleChange("instructor", e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-3 text-gray-400">
              <FaClock />
            </div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              className="pl-10 outline-none"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          <div>
            <Button type="button" variant="outline" className="flex items-center gap-2">
              <FaImage className="h-4 w-4" /> Upload image
            </Button>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-3 text-gray-400">
              <FaPen />
            </div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-[100px] pl-10"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/tracks")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#01589a] hover:bg-[#01589a]/90">
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
