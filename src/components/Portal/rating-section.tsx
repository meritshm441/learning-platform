"use client"

import { useState } from "react"
import { FiStar, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi"

interface RatingSectionProps {
  trackId?: string // Make trackId optional with a default in the component
  trackName?: string // Optional track name for better user experience
}

export function RatingSection({ trackId = "67f82d152d80247a28fcc2d0", trackName }: RatingSectionProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [review, setReview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleRatingSubmit = async () => {
    if (!rating) return

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/tracks/${trackId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          review: review.trim() || undefined, // Only send review if it's not empty
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `API error: ${response.status}`)
      }

      // Handle successful submission
      setSubmitStatus("success")

      // Optional: Clear the form after successful submission
      // setRating(null)
      // setReview("")
    } catch (error) {
      console.error("Error submitting rating:", error)
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit rating")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-6">{trackName ? `Rate "${trackName}"` : "Rate us"}</h2>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1

            return (
              <button
                title={`Rate ${ratingValue} stars`}
                aria-label={`Rate ${ratingValue} stars`}
                key={index}
                type="button"
                className="bg-transparent border-none cursor-pointer outline-none p-1"
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                disabled={isSubmitting}
              >
                <FiStar
                  className={`w-8 h-8 ${
                    (hover || rating) && (hover || rating)! >= ratingValue
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  } ${isSubmitting ? "opacity-50" : ""}`}
                />
              </button>
            )
          })}

          {rating && <span className="ml-4 text-gray-600">You selected {rating} stars</span>}
        </div>

        {/* Review textarea */}
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01589a] focus:border-transparent"
            rows={3}
            placeholder={`Share your thoughts about ${trackName || "this track"} (optional)`}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleRatingSubmit}
            disabled={!rating || isSubmitting}
            className={`flex items-center px-4 py-2 rounded ${
              !rating ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#01589a] text-white hover:bg-[#014a82]"
            } ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <FiSend className="mr-2" /> Submit Rating
              </>
            )}
          </button>

          {/* Success message */}
          {submitStatus === "success" && (
            <div className="ml-4 flex items-center text-green-600">
              <FiCheck className="mr-1" /> Thank you for your feedback!
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="ml-4 flex items-center text-red-600">
              <FiAlertCircle className="mr-1" /> {errorMessage || "Failed to submit rating"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
