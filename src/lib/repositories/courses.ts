import type { Course, CourseCategory } from "@/lib/types/course"
import type { Track } from "@/lib/types/track"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://tmp-se-projectapi.azurewebsites.net/api"

export async function fetchTracks() {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks`, {
      cache: "no-store",
    })

    if (!response.ok) {
      console.warn(`Tracks API returned ${response.status}. Using fallback data.`)
      return { success: true, tracks: getSampleTracks() }
    }

    const data = await response.json()

    if (!data.success || !Array.isArray(data.tracks)) {
      console.warn("Unexpected tracks API response. Using fallback data.", data)
      return { success: true, tracks: getSampleTracks() }
    }

    return data
  } catch (error) {
    console.error("Error in fetchTracks:", error)
    return { success: true, tracks: getSampleTracks() }
  }
}

export async function fetchTrackById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching track ${id}:`, error)
    throw error
  }
}

// Update the fetchCourses function to properly handle the API response structure
export const fetchCourses = async (): Promise<Course[]> => {
  try {
    // Use the provided API endpoint
    const response = await fetch(`${API_BASE_URL}/courses`, {
      cache: "no-store", // Disable caching to ensure fresh data
    })

    if (!response.ok) {
      console.warn(`API returned status: ${response.status}. Using fallback data.`)
      // Return fallback data if the API is unavailable
      return getSampleCourses()
    }

    const data = await response.json()

    // Check if the response is an array or an object with a courses property
    if (Array.isArray(data)) {
      return data
    } else if (data && typeof data === "object") {
      // If it's an object, try to find a property that might contain the courses
      if (Array.isArray(data.courses)) {
        return data.courses
      } else if (Array.isArray(data.data)) {
        return data.data
      } else if (Array.isArray(data.results)) {
        return data.results
      }
    }

    // If we couldn't find courses in the response, log the response and return fallback data
    console.warn("Unexpected API response format:", data)
    return getSampleCourses()
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    // Return fallback data on any error
    return getSampleCourses()
  }
}

// Update the getCoursesByCategory function to handle potential non-array responses

export const getCoursesByCategory = async (): Promise<CourseCategory[]> => {
  try {
    const courses = await fetchCourses()

    if (!Array.isArray(courses)) {
      console.error("Expected courses to be an array, but got:", typeof courses)
      return []
    }

    const categoriesMap = new Map<string, Course[]>()

    courses.forEach((course) => {
      const category = course.category?.trim() || "Uncategorized"
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, [])
      }
      categoriesMap.get(category)?.push(course)
    })

    const categories: CourseCategory[] = Array.from(categoriesMap.entries()).map(
      ([categoryName, coursesInCategory]) => ({
        name: categoryName,
        courses: coursesInCategory,
      })
    )

    return categories
  } catch (error) {
    console.error("Failed to group courses by category:", error)
    throw error // Let the calling component (PortalPage) handle this
  }
}

// // Fallback sample data
function getSampleCourses(): Course[] {
  return [
    {
      _id: "1",
      title: "Quick Introduction to ReactJs",
      description: "Learn the fundamentals of React.js and build modern user interfaces",
      instructor: "Jane Smith",
      duration: "4 weeks",
      image:
        "https://sjc.microlink.io/jvTUB2j8oqOWFgmsFVmBDlESM0NSZ1z1bXgBWOujRVnPmhE5kEJxwbD-ay848pvXs5w0yVTRYGiA9eKV-bEFAQ.jpeg",
      price: 99.99,
      category: "Software Development",
      level: "Beginner",
      tags: ["React", "JavaScript", "Frontend"],
      enrollmentStatus: "Registered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      track: {
        id: "t1",
        name: "Frontend Development",
        description: "Track for frontend technologies",
      },
    },
    {
      _id: "2",
      title: "Quick Introduction to NodeJs",
      description: "Master server-side JavaScript with Node.js",
      instructor: "John Doe",
      duration: "6 weeks",
      image:
        "https://sjc.microlink.io/jvTUB2j8oqOWFgmsFVmBDlESM0NSZ1z1bXgBWOujRVnPmhE5kEJxwbD-ay848pvXs5w0yVTRYGiA9eKV-bEFAQ.jpeg",
      price: 129.99,
      category: "Software Development",
      level: "Intermediate",
      tags: ["Node.js", "JavaScript", "Backend"],
      enrollmentStatus: "Registered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      track: {
        id: "t2",
        name: "Backend Development",
        description: "Track for backend technologies",
      },
    },
    {
      _id: "3",
      title: "Quick Introduction to NextJs",
      description: "Build production-ready React applications with Next.js",
      instructor: "Sarah Johnson",
      duration: "5 weeks",
      image:
        "https://sjc.microlink.io/jvTUB2j8oqOWFgmsFVmBDlESM0NSZ1z1bXgBWOujRVnPmhE5kEJxwbD-ay848pvXs5w0yVTRYGiA9eKV-bEFAQ.jpeg",
      price: 149.99,
      category: "Software Development",
      level: "Intermediate",
      tags: ["Next.js", "React", "Full-stack"],
      enrollmentStatus: "Registered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      track: {
        id: "t1",
        name: "Frontend Development",
        description: "Track for frontend technologies",
      },
    },
    {
      _id: "4",
      title: "Quick Introduction to Django",
      description: "Learn Python web development with Django framework",
      instructor: "Michael Brown",
      duration: "8 weeks",
      image:
        "https://sjc.microlink.io/jvTUB2j8oqOWFgmsFVmBDlESM0NSZ1z1bXgBWOujRVnPmhE5kEJxwbD-ay848pvXs5w0yVTRYGiA9eKV-bEFAQ.jpeg",
      price: 179.99,
      category: "Software Development",
      level: "Intermediate",
      tags: ["Django", "Python", "Backend"],
      enrollmentStatus: "Registered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      track: {
        id: "t2",
        name: "Backend Development",
        description: "Track for backend technologies",
      },
    },
    {
      _id: "5",
      title: "AWS Cloud Practitioner",
      description:
        "Gain hands-on experience in cloud architecture, preparing you to manage scalable solutions",
      instructor: "Alex Wilson",
      duration: "6 weeks",
      image:
        "https://sjc.microlink.io/jvTUB2j8oqOWFgmsFVmBDlESM0NSZ1z1bXgBWOujRVnPmhE5kEJxwbD-ay848pvXs5w0yVTRYGiA9eKV-bEFAQ.jpeg",
      price: 199.99,
      category: "Cloud Computing",
      level: "Beginner",
      tags: ["AWS", "Cloud", "DevOps"],
      enrollmentStatus: "Open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      track: {
        id: "t3",
        name: "Cloud Computing",
        description: "Track for cloud technologies",
      },
    },
  ]
}

function getSampleTracks(): Track[] {
  return [
    {
      _id: "track-1",
      name: "Software Engineering Track",
      description:
        "Comprehensive training in modern software development covering full-stack web development.",
      price: 350,
      instructor: "John Doe",
      duration: "12 weeks",
      image: "/placeholder.svg?height=192&width=384",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "track-2",
      name: "Cloud Computing Expertise",
      description: "Master cloud computing with AWS, Azure, and Google Cloud Platform.",
      price: 380,
      instructor: "Williams",
      duration: "12 weeks",
      image: "/placeholder.svg?height=192&width=384",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "track-3",
      name: "Data Science Mastery",
      description: "Learn data science, machine learning, and AI with Python and R.",
      price: 380,
      instructor: "Enoch",
      duration: "12 weeks",
      image: "/placeholder.svg?height=192&width=384",
      createdAt: new Date().toISOString(),
    },
  ]
}
