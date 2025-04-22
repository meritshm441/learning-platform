"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const redirectToHome = () => {
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-3xl px-6 py-16 text-center">
        {/* Decorative elements */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute w-full h-full rounded-full opacity-10 bg-secondary-200 animate-pulse"></div>
          <div className="absolute w-48 h-48 rounded-full opacity-20 bg-secondary-300 top-8 left-8"></div>

          <div className="relative flex items-center justify-center w-full h-full">
            <h1 className="text-[150px] font-black text-gray-400 leading-none">
              4<span className="inline-block animate-bounce">0</span>4
            </h1>
          </div>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-gray-400">Oops! Page not found</h2>
        <p className="max-w-md mx-auto mb-10 text-gray-400">
          We can't seem to find the page you're looking for. It might have been removed, renamed, or didn't exist in the
          first place.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={redirectToHome}
            className="px-8 py-3 font-medium text-gray-700 transition-all duration-300 rounded-lg shadow-lg bg-secondary-500 hover:bg-secondary-600"
          >
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="px-8 py-3 font-medium transition-all duration-300 bg-white border rounded-lg shadow-md border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center mt-16 space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-secondary-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

