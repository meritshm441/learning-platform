"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { IoIosClose, IoIosMenu } from "react-icons/io"
import { BiChevronDown } from "react-icons/bi"
import { cli_blue } from "@/lib/constants/images"
import { LuGraduationCap } from "react-icons/lu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    role?: string;
    isVerified?: boolean;
    _id?: string;
    image?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
  
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  
    setLoading(false); // Mark loading as false after checking auth
  }, []);
  console.log("user", user?.firstname);
  
  
  
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setUser(null)
    setOpenDropdown(false)
    window.location.href = "/"
  }

  return (
    <header className="border-b border-gray-200  w-full relative">
      <div className="px-4 py-3 lg:px-48 md:px-20 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          
          <Link href="/" className="flex items-center w-24 h-6">
            <Image
              src={cli_blue}
              alt="CLient Logo"
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
        ) : (
          <div className="relative hidden sm:block">
            <button
              className="flex items-center  gap-2 rounded-full px-2 py-1 text-sm font-medium"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="flex h-8 w-8  items-center justify-center rounded-full bg-[#01589a] text-white">
                {user?.image ? (
                  <img
                    src={user.image}
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
              <div className="absolute right-0 mt-1 w-40 rounded-md border border-gray-200 bg-white  shadow-lg z-50">
                <div className="py-1 text-md font-normal">
                  <Link
                    href="/portal"
                    className="flex items-center px-4 py-2  hover:bg-gray-200 hover:text-[#115EA5]"
                    onClick={() => setOpenDropdown(false)}
                  >
                    <span className="mr-2"><LuGraduationCap className="text-[#115EA5] h-5 w-5" /></span> Portal
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2  text-sm  hover:bg-gray-200 hover:text-[#115EA5] text-left"
                  >
                    <span className="mr-2"><FaArrowRightToBracket className="text-[#115EA5] h-5 w-5" /></span> Logout
                  </button>
                </div>
              </div>
            )}
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
        <div className="sm:hidden absolute top-full left-0 right-0  z-50 border-b border-gray-200 shadow-md">
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
            ) : (
              <div className="pt-3 border-t  border-gray-100 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#01589a] text-white">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt="User"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user?.lastname?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="font-medium">{user?.lastname || "John Doe"}</span>
                </div>
                <Link
                  href="/"
                  className="text-[#01589a] px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portal
                </Link>
                <button onClick={logout} className="text-red-500 px-4 py-2 hover:bg-gray-100 text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
