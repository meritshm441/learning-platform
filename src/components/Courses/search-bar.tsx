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
    <div className="relative mx-auto mb-12 max-w-md">
      <input
        type="text"
        placeholder="Search course"
        value={query}
        onChange={handleSearch}
        className="w-full rounded border border-gray-400 px-4 py-3 pr-10 pl-10 transition-all outline-none"
      />
      <CiSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[#999999]" />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
