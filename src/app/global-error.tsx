'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (

    <body>
      <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-gray-700">Data Not Found</h1>
          <p className="text-2xl font-medium text-gray-600 mb-6">We’re sorry, but the requested information is currently unavailable.</p>
          <button
            className="px-4 py-2 font-medium text-white bg-secondary-400 rounded-md hover:bg-secondary-500  transition-all duration-300 ease-in-out"
            onClick={() => reset()}>Try again</button>
        </div>
      </div>
    </body>

  )
}