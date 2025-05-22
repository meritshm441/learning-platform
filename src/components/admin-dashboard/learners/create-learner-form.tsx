"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaVenusMars,
  FaMapMarkerAlt,
  FaPhone,
  FaUserSlash,
  FaDollarSign,
  FaImage,
  FaPen,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateLearnerForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    gender: "",
    location: "",
    phone: "",
    disabled: "",
    amount: "",
    description: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/learners")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-gray-500">Learners</h1>
        <span>/</span>
        <h1 className="text-2xl font-bold">Create Learners</h1>
      </div>

      <div className="bg-[#f9f9f9] dark:bg-[#1d1b20] p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaUser />
              </div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                className="pl-10"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaUser />
              </div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                className="pl-10"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaEnvelope />
            </div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="pl-10"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaGraduationCap />
              </div>
              <Label htmlFor="program">Select program</Label>
              <Select value={formData.program} onValueChange={(value) => handleChange("program", value)}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-development">Software Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaVenusMars />
              </div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaMapMarkerAlt />
              </div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                className="pl-10"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute left-3 top-1/2 text-gray-400">
                <FaPhone />
              </div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaUserSlash />
            </div>
            <Label htmlFor="disabled">Disabled</Label>
            <Select value={formData.disabled} onValueChange={(value) => handleChange("disabled", value)}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaDollarSign />
            </div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              className="pl-10"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>

          <div>
            <Button type="button" variant="outline" className="flex items-center gap-2">
              <FaImage className="h-4 w-4" /> Upload image
            </Button>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaPen />
            </div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="pl-10 min-h-[100px]"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/learners")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#01589a] hover:bg-[#01589a]/90">
              Create learner
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
