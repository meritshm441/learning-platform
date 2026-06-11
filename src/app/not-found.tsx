"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const redirectToHome = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-16 text-center">
        {/* Decorative elements */}
        <div className="relative mx-auto mb-8 h-64 w-64">
          <div className="bg-secondary-200 absolute h-full w-full animate-pulse rounded-full opacity-10"></div>
          <div className="bg-secondary-300 absolute top-8 left-8 h-48 w-48 rounded-full opacity-20"></div>

          <div className="relative flex h-full w-full items-center justify-center">
            <h1 className="text-[150px] leading-none font-black text-gray-400">
              4<span className="inline-block animate-bounce">0</span>4
            </h1>
          </div>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-gray-400">Oops! Page not found</h2>
        <p className="mx-auto mb-10 max-w-md text-gray-400">
          We can&apos;t seem to find the page you&apos;re looking for. It might have been removed,
          renamed, or didn&apos;t exist in the first place.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={redirectToHome}
            className="bg-secondary-500 hover:bg-secondary-600 rounded-lg px-8 py-3 font-medium text-gray-700 shadow-lg transition-all duration-300"
          >
            Go Home
          </button>

          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-200 px-8 py-3 font-medium text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>

        {/* Decorative dots */}
        <div className="mt-16 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-secondary-300 h-2 w-2 rounded-full"
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
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
