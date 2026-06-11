"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error?: string
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => Promise<void>
  logout: () => void
  verifyEmail: (code: string) => Promise<void>
  resendVerificationCode: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        return JSON.parse(storedUser)
      } catch {
        return null
      }
    }
    return null
  })
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email,
        role: "admin",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (_userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Don't set user here as they need to verify email first
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const verifyEmail = async (_code: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data after verification
      const userData = {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "admin@example.com",
        role: "admin",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerificationCode = async () => {
    // In a real app, this would call your API
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifyEmail,
        resendVerificationCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
