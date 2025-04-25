"use client"

import type React from "react"

import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FiX } from "react-icons/fi"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative max-w-md mx-auto mb-12">
      <input
        type="text"
        placeholder="Search course"
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-3 pl-10 pr-10  rounded outline-none border border-gray-400 transition-all"
      />
      <CiSearch className="absolute w-5 h-5 text-[#999999] left-3 top-1/2 transform -translate-y-1/2" />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
