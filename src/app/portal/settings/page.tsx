"use client"
import { PortalTabs } from "@/components/Portal/portal-tabs"
import type React from "react"
import { useState } from "react"
import { FiUser, FiPhone, FiMapPin, FiLock, FiSave, FiLogOut } from "react-icons/fi"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "",
    location: "",
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Profile data:", profileData)
    console.log("Password data:", passwordData)
    alert("Changes saved successfully!")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <div className="bg-[#01589a] h-[135px]"></div>

      <main className="flex-1">
        <div className="flex flex-col mx-auto px-4 md:px-20 lg:px-48 gap-8">
          {/* Portal Tabs */}
          <div className="shadow-md rounded-md overflow-hidden -mt-14">
            <PortalTabs />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Picture */}
            <div className="md:w-1/4">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-gray-200"></div>
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
                  <h2 className="text-2xl font-bold mb-6">Profile</h2>
                  <div className="bg-gray-100 p-6 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>

                      {/* Last Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <div className="relative">
                          <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={profileData.location}
                            onChange={handleProfileChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                  <div className="bg-gray-100 p-6 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* New Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#01589a] text-white rounded-md flex items-center justify-center hover:bg-[#014273] mb-4 sm:mb-0"
                  >
                    <FiSave className="mr-2" /> Save changes
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-300"
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
