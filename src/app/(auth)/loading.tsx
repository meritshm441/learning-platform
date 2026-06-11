export default function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className="hidden w-full md:order-1 md:block">
            <div className="h-[400px] w-full max-w-[481px] animate-pulse rounded-lg bg-gray-100" />
          </div>
          <div className="flex w-full max-w-lg flex-col items-center gap-8 md:order-2">
            <div className="h-8 w-56 animate-pulse rounded bg-gray-100" />
            <div className="w-full space-y-4">
              <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-12 w-full animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
