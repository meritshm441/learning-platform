"use client"
import { PortalTabs } from "@/components/Portal/portal-tabs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useRef } from "react"
import { FiUser, FiPhone, FiMapPin, FiLock, FiSave, FiLogOut } from "react-icons/fi"

export default function SettingsPage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    description: "",
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ... existing code ...

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      if (profileImage) {
        const file = dataUrlToFile(profileImage)
        formData.append("profileImage", file)
      }

      formData.append("contact", profileData.phone)
      formData.append("disabled", "false")
      formData.append("location", profileData.location)
      formData.append("description", profileData.description)

      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }
      const response = await fetch("https://tmp-se-projectapi.azurewebsites.net/api/auth/update", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const data = await response.json()
      localStorage.setItem("userData", JSON.stringify(data))
      alert("Profile updated successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const dataUrlToFile = (dataUrl: string): File => {
    const arr = dataUrl.split(",")
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], "profile.jpg", { type: mime || "image/jpeg" })
  }
  // For textarea elements
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  // For input elements
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="h-[135px] bg-[#01589a]"></div>

      <main className="flex-1">
        <div className="mx-auto flex flex-col gap-8 px-4 py-4 md:px-20 lg:px-48">
          {/* Portal Tabs */}
          <div className="-mt-14 overflow-hidden rounded-md shadow-md">
            <PortalTabs />
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left Column - Profile Picture */}
            <div className="md:w-1/4">
              <div className="flex flex-col items-start">
                <div
                  className="relative h-48 w-48 overflow-hidden rounded-full bg-gray-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <FiUser className="mb-2 h-12 w-12 text-gray-400" />
                      <p className="text-center text-sm text-gray-600">
                        Click to upload profile picture
                      </p>
                    </div>
                  )}
                  <input
                    title="profileImage"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">Learner</p>
              </div>
            </div>

            {/* Right Column - Profile Form */}
            <div className="md:w-3/4">
              <form onSubmit={handleSubmit}>
                {/* Profile Section */}
                <div className="mb-8">
                  <h2 className="mb-6 text-2xl font-bold">Profile</h2>
                  <div className="rounded-md bg-gray-100 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* First Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <div className="relative">
                          <FiPhone className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <div className="relative">
                          <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={profileData.location}
                            onChange={handleProfileChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <div className="relative">
                          <textarea
                            title="description"
                            name="description"
                            value={profileData.description}
                            onChange={handleDescriptionChange}
                            className="min-h-[100px] w-full resize-none rounded-md border border-gray-300 bg-white pt-3 pr-4 pb-16 pl-3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="mb-8">
                  <h2 className="mb-6 text-2xl font-bold">Change Password</h2>
                  <div className="rounded-md bg-gray-100 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* New Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 rounded-md bg-[#F7E9EA] p-4 text-sm text-[#A61D24]">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col justify-between sm:flex-row">
                  <button
                    type="submit"
                    className="mb-4 flex items-center justify-center rounded-md bg-[#01589a] px-6 py-2 text-white hover:bg-[#014273] sm:mb-0"
                  >
                    <FiSave className="mr-2" /> Save changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                      router.push("/login")
                    }}
                    className="flex items-center justify-center rounded-md bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
