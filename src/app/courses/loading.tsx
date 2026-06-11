"use client"

import { FiSearch } from "react-icons/fi"

export default function CoursesLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation - Skeleton */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-8">
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="hidden gap-6 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-10 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>
      </nav>

      {/* Hero Section - Skeleton */}
      <div className="w-full animate-pulse bg-gray-200 py-12 text-center">
        <div className="mx-auto h-8 w-32 rounded bg-gray-300"></div>
      </div>

      {/* Main Content - Skeleton */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
        {/* Search Bar - Skeleton */}
        <div className="relative mx-auto mb-12 max-w-md">
          <div className="h-12 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* All Courses - Skeleton */}
        <div className="mb-8 h-8 w-40 animate-pulse rounded bg-gray-200"></div>

        {/* Course Grid - Skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex animate-pulse flex-col">
              <div className="mb-4 h-[150px] overflow-hidden rounded-md bg-gray-200"></div>
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
              <div className="mb-4 h-4 w-5/6 rounded bg-gray-200"></div>
              <div className="mb-2 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <div key={starIndex} className="mr-1 h-5 w-5 rounded-full bg-gray-200"></div>
                  ))}
                </div>
                <div className="ml-2 h-5 w-8 rounded bg-gray-200"></div>
                <div className="ml-4 h-5 w-24 rounded bg-gray-200"></div>
              </div>
              <div className="mt-auto h-10 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer - Skeleton */}
      <footer className="mt-8 bg-gray-200 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Logo */}
            <div className="h-8 w-32 animate-pulse rounded bg-gray-300"></div>

            {/* Menu */}
            <div>
              <div className="mb-4 h-6 w-20 animate-pulse rounded bg-gray-300"></div>
              <div className="space-y-2">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-4 h-6 w-20 animate-pulse rounded bg-gray-300"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
                <div className="h-4 w-40 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Social and Copyright */}
          <div className="border-t border-gray-300 pt-8">
            <div className="mb-4 h-4 w-64 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
