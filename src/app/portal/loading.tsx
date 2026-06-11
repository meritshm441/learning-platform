import { FiGrid, FiSettings, FiMessageSquare, FiFileText } from "react-icons/fi"

export default function PortalLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header Skeleton */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="hidden space-x-6 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
      </header>

      <div className="h-16 bg-[#01589a]"></div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Portal Tabs Skeleton */}
          <div className="-mt-8 mb-8 overflow-hidden rounded-md shadow-md">
            <div className="flex bg-white">
              {[FiGrid, FiSettings, FiMessageSquare, FiFileText].map((Icon, index) => (
                <div key={index} className="flex items-center px-6 py-4 text-gray-400">
                  <Icon className="mr-2 h-5 w-5" />
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Courses Skeleton */}
          <div className="mb-12">
            <div className="mb-6 h-6 w-40 animate-pulse rounded bg-gray-200"></div>

            {/* Category Section Skeleton */}
            <div className="mb-12">
              <div className="mb-6 h-6 w-48 animate-pulse rounded bg-gray-200"></div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="h-[200px] animate-pulse bg-gray-200"></div>
                    <div className="p-4">
                      <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                      <div className="mb-4 h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
                      <div className="mt-4 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Section Skeleton */}
          <div className="mb-12">
            <div className="mb-6 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-200"
                ></div>
              ))}
            </div>
          </div>

          {/* Track Cards Skeleton */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 md:w-1/3">
                    <div className="h-[150px] w-full animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="p-4 md:w-2/3">
                    <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
