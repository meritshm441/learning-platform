import { FiGrid, FiSettings, FiMessageSquare, FiFileText } from "react-icons/fi"

export default function PortalLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white py-4 px-6 flex items-center justify-between border-b">
        <div className="flex items-center space-x-8">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="hidden md:flex space-x-6">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
      </header>

      <div className="bg-[#01589a] h-16"></div>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Portal Tabs Skeleton */}
          <div className="shadow-md rounded-md overflow-hidden -mt-8 mb-8">
            <div className="flex bg-white">
              {[FiGrid, FiSettings, FiMessageSquare, FiFileText].map((Icon, index) => (
                <div key={index} className="flex items-center px-6 py-4 text-gray-400">
                  <Icon className="w-5 h-5 mr-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Courses Skeleton */}
          <div className="mb-12">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>

            {/* Category Section Skeleton */}
            <div className="mb-12">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-[200px] bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Section Skeleton */}
          <div className="mb-12">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-2"></div>
              ))}
            </div>
          </div>

          {/* Track Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 p-4">
                    <div className="h-[150px] w-full bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="md:w-2/3 p-4">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
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
