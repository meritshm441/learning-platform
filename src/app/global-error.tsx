"use client"

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <body>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-gray-700">Data Not Found</h1>
          <p className="mb-6 text-2xl font-medium text-gray-600">
            We’re sorry, but the requested information is currently unavailable.
          </p>
          <button
            className="bg-secondary-400 hover:bg-secondary-500 rounded-md px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    </body>
  )
}
