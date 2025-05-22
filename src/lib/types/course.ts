export interface Course {
  _id: string // or use `id` if you want to map it
  title: string
  description: string
  image: string
  price: number
  instructor: string
  duration: string
  createdAt: string
  updatedAt: string
  track: {
    id: string
    name: string
    description: string
    instructor?: string
    image?: string
    duration?: string
    courses?: any[]
    price?: number
  }
  category?: string
  level?: string
  tags?: string[]
  enrollmentStatus?: string
}

  export interface CourseCategory {
    name: string
    courses: Course[]
  }
  