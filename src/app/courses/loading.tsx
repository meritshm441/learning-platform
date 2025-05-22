"use client"

import { FiSearch } from "react-icons/fi"

export default function CoursesLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation - Skeleton */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-8">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="hidden md:flex gap-6">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>

      {/* Hero Section - Skeleton */}
      <div className="w-full py-12 text-center bg-gray-200 animate-pulse">
        <div className="h-8 w-32 bg-gray-300 mx-auto rounded"></div>
      </div>

      {/* Main Content - Skeleton */}
      <main className="flex-1 px-4 py-8 md:px-8 max-w-7xl mx-auto w-full">
        {/* Search Bar - Skeleton */}
        <div className="relative max-w-md mx-auto mb-12">
          <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* All Courses - Skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-8"></div>

        {/* Course Grid - Skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col animate-pulse">
              <div className="mb-4 overflow-hidden rounded-md bg-gray-200 h-[150px]"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <div key={starIndex} className="w-5 h-5 mr-1 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
                <div className="ml-2 h-5 w-8 bg-gray-200 rounded"></div>
                <div className="ml-4 h-5 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-auto h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer - Skeleton */}
      <footer className="bg-gray-200 py-8 px-4 md:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo */}
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>

            {/* Menu */}
            <div>
              <div className="h-6 w-20 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="h-6 w-20 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Social and Copyright */}
          <div className="pt-8 border-t border-gray-300">
            <div className="h-4 w-64 bg-gray-300 rounded animate-pulse mb-4"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
