import { CiSearch } from "react-icons/ci"

interface EmptyStateProps {
  title?: string
  message?: string
}

export function EmptyState({
  title = "No courses found",
  message = "We couldn't find any courses matching your criteria. Please try a different search or check back later.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-gray-50">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
        <CiSearch className="w-8 h-8 text-[#01589a]" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  )
}
