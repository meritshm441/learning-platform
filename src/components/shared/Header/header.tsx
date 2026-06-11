"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useSyncExternalStore, useState } from "react"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { IoIosClose, IoIosMenu } from "react-icons/io"
import { BiChevronDown } from "react-icons/bi"
import { cli_blue } from "@/lib/constants/images"
import { LuGraduationCap } from "react-icons/lu"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

type LocalUser = {
  firstname: string
  lastname: string
  email: string
  role?: string
  isVerified?: boolean
  _id?: string
  image?: string
  enrolledCourses?: { _id: string; title: string; progress: number }[]
}

function subscribeToLocalAuth(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener("authStateChanged", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("authStateChanged", callback)
  }
}

function getLocalAuthSnapshot(): LocalUser | null {
  const token = localStorage.getItem("token")
  const userData = localStorage.getItem("user")
  return token && userData ? (JSON.parse(userData) as LocalUser) : null
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const localUser = useSyncExternalStore(subscribeToLocalAuth, getLocalAuthSnapshot, () => null)

  const loading = status === "loading"
  const isAuthenticated = status === "authenticated" || !!localUser
  const user: LocalUser | null =
    status === "authenticated" && session?.user
      ? {
          firstname: session.user.name?.split(" ")[0] || "",
          lastname: session.user.name?.split(" ")[1] || "",
          email: session.user.email || "",
          image: session.user.image || "",
          enrolledCourses: [],
        }
      : localUser

  const logout = () => {
    signOut({ redirect: false }).then(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setOpenDropdown(false)
      window.dispatchEvent(new Event("authStateChanged"))
      router.push("/")
    })
  }

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

  const hasEnrolledCourses = user?.enrolledCourses && user.enrolledCourses.length > 0

  return (
    <header className="relative w-full border-b border-gray-200">
      <div className="flex items-center justify-between border px-4 py-3 md:px-20 lg:px-48">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex h-6 w-24 items-center">
            <Image
              src={cli_blue || "/placeholder.svg?height=24&width=85&query=blue logo"}
              alt="Client Logo"
              width={85}
              height={24}
              className="h-full w-full"
            />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/" className="font-medium text-gray-800 hover:text-[#01589a]">
              Home
            </Link>
            <Link href="/courses" className="font-medium text-gray-800 hover:text-[#01589a]">
              Courses
            </Link>
          </nav>
        </div>

        {/* Auth Section */}
        {!loading && !isAuthenticated ? (
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/login"
              className="flex items-center rounded border border-[#01589a] px-3 py-1.5 text-sm text-[#01589a] hover:bg-[#e6eff5]"
            >
              Login
              <FaArrowRightToBracket className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="flex items-center rounded bg-[#01589a] px-3 py-1.5 text-sm text-white hover:bg-[#115ea5]"
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
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#01589a] text-white">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span>{user?.firstname?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span>{user?.firstname}</span>
              <span>{user?.lastname}</span>
              <BiChevronDown className="h-4 w-4" />
            </button>

            {openDropdown && (
              <div className="absolute right-0 z-50 mt-1 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                <div className="text-md py-1 font-normal">
                  {hasEnrolledCourses && (
                    <Link
                      href="/portal"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-[#115EA5]"
                      onClick={() => setOpenDropdown(false)}
                    >
                      <LuGraduationCap className="mr-2 h-5 w-5 text-[#115EA5]" />
                      Portal
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-200 hover:text-[#115EA5]"
                  >
                    <FaArrowRightToBracket className="mr-2 h-5 w-5 text-[#115EA5]" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:block">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          className="flex items-center sm:hidden"
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
        <div className="absolute top-full right-0 left-0 z-50 border-b border-gray-200 bg-white shadow-md sm:hidden">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-800 hover:text-[#01589a]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-gray-800 hover:text-[#01589a]"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
            </nav>
            {!loading && !isAuthenticated ? (
              <div className="flex flex-col space-y-3 border-t border-gray-100 pt-3">
                <Link
                  href="/login"
                  className="rounded border border-[#01589a] px-4 py-2 text-center text-[#01589a] hover:bg-[#e6eff5]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded bg-[#01589a] px-4 py-2 text-center text-white hover:bg-[#115ea5]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : !loading && isAuthenticated ? (
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#01589a] text-white">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        width={32}
                        height={32}
                        className="h-full w-full rounded-full object-cover"
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
                {hasEnrolledCourses && (
                  <Link
                    href="/portal"
                    className="px-4 py-2 text-[#01589a] hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Portal
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 pt-3">
                <div className="h-8 w-full animate-pulse rounded bg-gray-200"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
