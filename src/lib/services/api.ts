import axios from "axios"

const API_BASE_URL = "https://tmp-se-projectapi.azurewebsites.net/api"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add request interceptor to include auth token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/admin/dashboard"
    }
    return Promise.reject(error)
  },
)

// Auth services
export const authService = {
  // Login user (admin or learner)
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  },

  // Register admin
  registerAdmin: async (adminData: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    contact: string
  }) => {
    const response = await api.post("/auth/signup/admin", adminData)
    return response.data
  },

  // Register learner
  registerLearner: async (learnerData: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    const response = await api.post("/auth/signup/learner", learnerData)
    return response.data
  },

  // Verify email
  verifyEmail: async (token: string) => {
    const response = await api.post("/auth/verify-email", { token })
    return response.data
  },

  // Resend verification token
  resendToken: async () => {
    const response = await api.post("/auth/resend-token")
    return response.data
  },
}

// Dashboard data services
export const dashboardService = {
  // Get dashboard stats
  getStats: async () => {
    // This endpoint is not specified in the documentation
    // Replace with the actual endpoint when available
    const response = await api.get("/admin/dashboard/stats")
    return response.data
  },

  // Get learners
  getLearners: async () => {
    // This endpoint is not specified in the documentation
    // Replace with the actual endpoint when available
    const response = await api.get("/admin/learners")
    return response.data
  },

  // Get invoices
  getInvoices: async () => {
    // This endpoint is not specified in the documentation
    // Replace with the actual endpoint when available
    const response = await api.get("/admin/invoices")
    return response.data
  },

  // Get revenue data
  getRevenueData: async () => {
    // This endpoint is not specified in the documentation
    // Replace with the actual endpoint when available
    const response = await api.get("/admin/revenue")
    return response.data
  },
}

// Invoices API
export const invoicesApi = {
  // Get all invoices
  getAll: async () => {
    const response = await api.get("/invoices")
    return response.data
  },

  // Get single invoice
  getById: async (id: string) => {
    const response = await api.get(`/invoices/${id}`)
    return response.data
  },

  // Create invoice
  create: async (invoiceData: any) => {
    const response = await api.post("/invoices", invoiceData)
    return response.data
  },

  // Update invoice
  update: async (id: string, invoiceData: any) => {
    const response = await api.put(`/invoices/${id}`, invoiceData)
    return response.data
  },

  // Delete invoice
  delete: async (id: string) => {
    const response = await api.delete(`/invoices/${id}`)
    return response.data
  },
}

// Learners API
export const learnersApi = {
  // Get all learners
  getAll: async () => {
    const response = await api.get("/users/learners")
    return response.data
  },

  // Get single learner
  getById: async (id: string) => {
    const response = await api.get(`/users/learners/${id}`)
    return response.data
  },

  // Create learner (register)
  create: async (learnerData: any) => {
    const response = await api.post("/auth/signup/learner", learnerData)
    return response.data
  },

  // Update learner
  update: async (id: string, learnerData: any) => {
    const response = await api.put(`/users/${id}`, learnerData)
    return response.data
  },

  // Delete learner
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}

// Tracks API
export const tracksApi = {
  // Get all tracks
  getAll: async () => {
    const response = await api.get("/tracks")
    return response.data
  },

  // Get single track
  getById: async (id: string) => {
    const response = await api.get(`/tracks/${id}`)
    return response.data
  },

  // Create track
  create: async (trackData: any) => {
    const response = await api.post("/tracks", trackData)
    return response.data
  },

  // Update track
  update: async (id: string, trackData: any) => {
    const response = await api.put(`/tracks/${id}`, trackData)
    return response.data
  },

  // Delete track
  delete: async (id: string) => {
    const response = await api.delete(`/tracks/${id}`)
    return response.data
  },
}

// Courses API
export const coursesApi = {
  // Get all courses
  getAll: async () => {
    const response = await api.get("/courses")
    return response.data
  },

  // Get single course
  getById: async (id: string) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  // Create course
  create: async (courseData: any) => {
    const response = await api.post("/courses", courseData)
    return response.data
  },

  // Update course
  update: async (id: string, courseData: any) => {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
  },

  // Delete course
  delete: async (id: string) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
  },
}

// Course Registrations API
export const registrationsApi = {
  // Get all registrations
  getAll: async () => {
    const response = await api.get("/registrations")
    return response.data
  },

  // Get registrations by course
  getByCourse: async (courseId: string) => {
    const response = await api.get(`/registrations?courseId=${courseId}`)
    return response.data
  },

  // Register for a course
  register: async (registrationData: any) => {
    const response = await api.post("/registrations", registrationData)
    return response.data
  },
}

// Track Enrollments API
export const enrollmentsApi = {
  // Get all enrollments
  getAll: async () => {
    const response = await api.get("/enrollments")
    return response.data
  },

  // Get enrollments by track
  getByTrack: async (trackId: string) => {
    const response = await api.get(`/enrollments?trackId=${trackId}`)
    return response.data
  },

  // Enroll in a track
  enroll: async (enrollmentData: any) => {
    const response = await api.post("/enrollments", enrollmentData)
    return response.data
  },
}

export default api
