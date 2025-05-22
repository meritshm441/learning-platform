"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategorySection } from "@/components/Portal/category-section";
import { PortalTabs } from "@/components/Portal/portal-tabs";
import { RatingSection } from "@/components/Portal/rating-section";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { fetchTracks } from "@/lib/repositories/courses";

// Import the Course type from the correct location
import type { Course } from "@/lib/types/course";

// Type for API response
type EnrollmentResponse = {
  _id: string;
  name: string;
  description: string;
  category?: string;
  instructor?: string;
  duration?: string;
  image?: string;
  price?: number;
  trackId?: string; // Add trackId to the enrollment response
  // Add any other fields that might come from the API
};

type EnrollmentCategory = {
  name: string;
  courses: Course[];
  trackId?: string; // Add trackId to the category
};

// Track type
type Track = {
  _id: string;
  id?: string;
  name: string;
  description: string;
  instructor?: string;
  image?: string;
  duration?: string;
  courses?: any[];
  price?: number;
};

export default function PortalPage() {
  const [categories, setCategories] = useState<EnrollmentCategory[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasEnrollments, setHasEnrollments] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | undefined>(
    undefined
  );
  const [selectedTrackName, setSelectedTrackName] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("You must be logged in to view your enrollments");
        }

        // Fetch enrollments from API
        const enrollmentResponse = await fetch(
          `https://tmp-se-projectapi.azurewebsites.net/api/enrollments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: "67e7fd04191853e356efd63d", // Default course ID
            }),
          }
        );

        if (!enrollmentResponse.ok) {
          throw new Error(
            `Failed to fetch enrollments: ${enrollmentResponse.status}`
          );
        }

        const enrollmentData = await enrollmentResponse.json();

        // Process the enrollment data
        if (
          enrollmentData &&
          Array.isArray(enrollmentData.enrollments) &&
          enrollmentData.enrollments.length > 0
        ) {
          // Set hasEnrollments to true if there are any enrollments
          setHasEnrollments(true);

          // Group courses by category
          const coursesByCategory: Record<
            string,
            { courses: Course[]; trackId?: string }
          > = {};

          enrollmentData.enrollments.forEach(
            (enrollment: EnrollmentResponse) => {
              const category = enrollment.category || "Uncategorized";
              const trackId = enrollment.trackId || enrollment._id; // Use trackId if available, otherwise use _id

              if (!coursesByCategory[category]) {
                coursesByCategory[category] = {
                  courses: [],
                  trackId: trackId, // Store trackId at the category level
                };
              }

              // Transform enrollment data to match expected Course type
              const courseData: Course = {
                _id: enrollment._id,
                title: enrollment.name || "Untitled Course",
                description: enrollment.description || "",
                image:
                  enrollment.image || "/placeholder.svg?height=150&width=200",
                price: enrollment.price || 0,
                instructor: enrollment.instructor || "Unknown Instructor",
                duration: enrollment.duration || "N/A",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                track: {
                  id: trackId, // Use the trackId here
                  name: category,
                  description: `${category} track`,
                  instructor: enrollment.instructor,
                  image:
                    enrollment.image || "/placeholder.svg?height=150&width=200",
                  duration: enrollment.duration,
                  price: enrollment.price,
                },
                category: category,
                level: "Beginner", // Default level
                tags: [category], // Default tags
                enrollmentStatus: "Registered", // Mark as registered since these are enrollments
              };

              coursesByCategory[category].courses.push(courseData);
            }
          );

          // Convert to array format expected by the UI
          const categoriesArray = Object.keys(coursesByCategory).map(
            (categoryName) => ({
              name: categoryName,
              courses: coursesByCategory[categoryName].courses,
              trackId: coursesByCategory[categoryName].trackId,
            })
          );

          setCategories(categoriesArray);

          // Set the first category's trackId as the selected trackId for rating
          if (categoriesArray.length > 0 && categoriesArray[0].trackId) {
            setSelectedTrackId(categoriesArray[0].trackId);
            setSelectedTrackName(categoriesArray[0].name);
          }
        } else {
          // If no enrollments or unexpected format
          setHasEnrollments(false);
          setCategories([]);
        }

        // Fetch tracks (available courses) regardless of enrollment status
        try {
          const tracksResponse = await fetchTracks();
          if (tracksResponse?.tracks && Array.isArray(tracksResponse.tracks)) {
            setTracks(tracksResponse.tracks);

            // If no enrolled courses, use the first track for rating
            if (!hasEnrollments && tracksResponse.tracks.length > 0) {
              setSelectedTrackId(tracksResponse.tracks[0]._id);
              setSelectedTrackName(tracksResponse.tracks[0].name);
            }
          }
        } catch (trackError) {
          console.error("Error fetching tracks:", trackError);
          // Don't set the main error state, just log it
        }
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load enrollments"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasEnrollments]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="bg-[#01589a] h-36"></div>

      <main className="flex-1">
        {/* Update this container to match header padding */}
        <div className="flex flex-col mx-auto px-4 md:px-20 lg:px-48 gap-8">
          {/* Portal Tabs - removed the extra shadow and bg-red-500 classes */}
          <div className="rounded-sm overflow-hidden -mt-14">
            <PortalTabs />
          </div>

          {/* Error message if courses failed to load */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {/* Enrolled Courses Section */}
          <div className="mb-12">
            <h1 className="text-xl font-bold mb-6">Enrolled courses</h1>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <FiLoader className="w-8 h-8 animate-spin text-[#01589a]" />
                <span className="ml-2 text-gray-600">
                  Loading your enrollments...
                </span>
              </div>
            ) : hasEnrollments ? (
              categories.map((category) => (
                <CategorySection
                  key={category.name}
                  title={`${category.name} Track`}
                  courses={category.courses}
                />
              ))
            ) : !error ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
                <p>
                  No enrolled courses found. Browse our course catalog below to
                  get started!
                </p>
              </div>
            ) : null}
          </div>

          {/* Rating Section */}
          <RatingSection
            trackId={selectedTrackId}
            trackName={selectedTrackName}
          />

          {/* Available Courses Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Available courses</h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <FiLoader className="w-8 h-8 animate-spin text-[#01589a]" />
                <span className="ml-2 text-gray-600">
                  Loading available courses...
                </span>
              </div>
            ) : tracks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tracks.map((track) => (
                  <div
                    key={track._id}
                    className="border border-gray-400 rounded-md overflow-hidden"
                  >
                    <div className="grid grid-cols-3">
                      <div className="col-span-1">
                        <Image
                          src={
                            track.image ||
                            "/placeholder.svg?height=150&width=150"
                          }
                          alt={track.name}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                          unoptimized={track.image?.includes("cloudinary.com")}
                        />
                      </div>
                      <div className="col-span-2 p-4">
                        <h3 className="font-bold mb-2">{track.name}</h3>
                        <p className="text-sm mb-2 line-clamp-2">
                          {track.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/track/${track._id}`}
                            className="text-[#01589a] text-sm font-medium hover:underline"
                          >
                            View Track
                          </Link>
                          <span className="text-sm font-semibold">
                            ${track.price || 350}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full p-6 border border-gray-200 rounded-md text-center">
                <p className="text-gray-500">
                  No courses available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
