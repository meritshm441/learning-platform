"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaArrowRightToBracket, FaXTwitter } from "react-icons/fa6"
import { IoIosClose, IoIosMenu } from "react-icons/io"
import { cli_blue } from "@/lib/constants/images"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white w-full relative">
      <div className=" px-4 py-3 lg:px-48  md:px-20 flex items-center w-full justify-between">
        <div className="flex items-center gap-4 md:gap-8  ">
          <Link href="/" className="flex items-center w-24 h-6 " >
            <Image
              src={cli_blue}
              alt="CLeint Logo"
              width={85}
              height={24}
              className="text-[#01589a] w-full h-full"
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

        {/* Desktop buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3 sm:px-4 py-1.5 border border-[#01589a] text-[#01589a] rounded hover:bg-[#e6eff5] transition-colors flex items-center text-sm"
          >
            Login
            <FaArrowRightToBracket className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className="px-3 sm:px-4 py-1.5 bg-[#01589a] text-white rounded hover:bg-[#115ea5] transition-colors flex items-center text-sm"
          >
            Sign Up
            <FaArrowRightToBracket className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <IoIosClose className="h-6 w-6 text-[#01589a]" /> : <IoIosMenu className="h-6 w-6 text-[#01589a]" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-20  right-0 bg-white z-50 border-b border-gray-200 shadow-md">
          <div className="container px-4 py-4 flex flex-col space-y-4">
            <nav className="flex flex-col space-y-3 w-32">
              <Link
                href="/"
                className="text-gray-800 hover:text-[#01589a] w-full font-normal py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-gray-800 hover:text-[#01589a] w-full font-normal py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                className="px-4 py-2 border border-[#01589a] text-[#01589a] rounded hover:bg-[#e6eff5] transition-colors flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
                <FaArrowRightToBracket className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[#01589a] text-white rounded hover:bg-[#115ea5] transition-colors flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
                <FaArrowRightToBracket className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
