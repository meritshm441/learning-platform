"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { IoIosClose, IoIosMenu } from "react-icons/io"
import { BiChevronDown } from "react-icons/bi"
import { cli_blue } from "@/lib/constants/images"
import { LuGraduationCap } from "react-icons/lu"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{
    firstname: string
    lastname: string
    email: string
    role?: string
    isVerified?: boolean
    _id?: string
    image?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [openDropdown, setOpenDropdown] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Function to check authentication status
  const checkAuthStatus = () => {
    // Check for NextAuth session first
    if (status === "authenticated" && session?.user) {
      setIsAuthenticated(true)
      setUser({
        firstname: session.user.name?.split(" ")[0] || "",
        lastname: session.user.name?.split(" ")[1] || "",
        email: session.user.email || "",
        image: session.user.image || "",
      })
      setLoading(false)
      return
    }

    // Fall back to localStorage check
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    checkAuthStatus()

    // Add event listener for storage changes (for cross-tab synchronization)
    window.addEventListener("storage", checkAuthStatus)

    // Custom event listener for auth changes within the same tab
    window.addEventListener("authStateChanged", checkAuthStatus)

    return () => {
      window.removeEventListener("storage", checkAuthStatus)
      window.removeEventListener("authStateChanged", checkAuthStatus)
    }
  }, [session, status, pathname])

  const logout = () => {
    // Handle both NextAuth and custom auth logout
    signOut({ redirect: false }).then(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsAuthenticated(false)
      setUser(null)
      setOpenDropdown(false)

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("authStateChanged"))

      router.push("/")
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (openDropdown && !target.closest('[data-dropdown="user-menu"]')) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  return (
    <header className="border-b border-gray-200 w-full relative">
      <div className="px-4 py-3 border lg:px-48 md:px-20 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center w-24 h-6">
            <Image
              src={cli_blue || "/placeholder.svg?height=24&width=85&query=blue logo"}
              alt="Client Logo"
              width={85}
              height={24}
              className="w-full h-full"
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-800 hover:text-[#01589a] font-medium">
              Home
            </Link>
            <Link href="/courses" className="text-gray-800 hover:text-[#01589a] font-medium">
              Courses
            </Link>
          </nav>
        </div>

        {/* Auth Section */}
        {!loading && !isAuthenticated ? (
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-3 py-1.5 border border-[#01589a] text-[#01589a] rounded hover:bg-[#e6eff5] text-sm flex items-center"
            >
              Login
              <FaArrowRightToBracket className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 bg-[#01589a] text-white rounded hover:bg-[#115ea5] text-sm flex items-center"
            >
              Sign Up
              <FaArrowRightToBracket className="ml-1 h-4 w-4" />
            </Link>
          </div>
        ) : !loading && isAuthenticated ? (
          <div className="relative hidden sm:block" data-dropdown="user-menu">
            <button
              className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#01589a] text-white overflow-hidden">
                {user?.image ? (
                  <img
                    src={user.image || "/placeholder.svg?height=32&width=32&query=user avatar"}
                    alt="User"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.firstname?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span>{user?.firstname}</span>
              <span>{user?.lastname}</span>
              <BiChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                <div className="py-1 text-md font-normal">
                  <Link
                    href="/portal"
                    className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-[#115EA5]"
                    onClick={() => setOpenDropdown(false)}
                  >
                    <span className="mr-2">
                      <LuGraduationCap className="text-[#115EA5] h-5 w-5" />
                    </span>{" "}
                    Portal
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-200 hover:text-[#115EA5] text-left"
                  >
                    <span className="mr-2">
                      <FaArrowRightToBracket className="text-[#115EA5] h-5 w-5" />
                    </span>{" "}
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:block">
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <IoIosClose className="h-6 w-6 text-[#01589a]" />
          ) : (
            <IoIosMenu className="h-6 w-6 text-[#01589a]" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 z-50 border-b border-gray-200 shadow-md bg-white">
          <div className="px-4 py-4 flex flex-col space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-800 hover:text-[#01589a]" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/courses" className="text-gray-800 hover:text-[#01589a]" onClick={() => setIsMenuOpen(false)}>
                Courses
              </Link>
            </nav>
            {!loading && !isAuthenticated ? (
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-[#01589a] text-[#01589a] rounded hover:bg-[#e6eff5] text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-[#01589a] text-white rounded hover:bg-[#115ea5] text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : !loading && isAuthenticated ? (
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#01589a] text-white overflow-hidden">
                    {user?.image ? (
                      <img
                        src={user.image || "/placeholder.svg?height=32&width=32&query=user avatar"}
                        alt="User"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user?.firstname?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <span className="font-medium">{user?.firstname || ""}</span>
                    <span className="ml-1">{user?.lastname || ""}</span>
                  </div>
                </div>
                <Link
                  href="/portal"
                  className="text-[#01589a] px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portal
                </Link>
                <button onClick={logout} className="text-red-500 px-4 py-2 hover:bg-gray-100 text-left">
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-100">
                <div className="h-8 w-full rounded bg-gray-200 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
