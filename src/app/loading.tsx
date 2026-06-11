"use client"

import { useEffect, useState } from "react"
import { BiBookOpen, BiCode, BiGlobe, BiServer } from "react-icons/bi"
import { BsDatabase } from "react-icons/bs"
import { LuSparkles } from "react-icons/lu"

export default function Loading() {
  const [particles] = useState(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 5 + 3,
      animationDelay: Math.random() * 5,
    }))
  )
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Preparing your learning journey")

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 100 ? 100 : newProgress
      })
    }, 600)

    // Change loading text periodically
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = [
          "Preparing your learning journey",
          "Gathering knowledge resources",
          "Connecting to the world of code",
          "Unlocking educational content",
          "Building your learning path",
        ]
        const currentIndex = texts.indexOf(prev)
        const nextIndex = (currentIndex + 1) % texts.length
        return texts[nextIndex]
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center text-4xl font-bold text-[#01589a]">
            <span>CLient</span>
            <LuSparkles className="ml-2 h-6 w-6 animate-pulse text-[#d89614]" />
          </div>
        </div>

        {/* Animated Icons */}
        <div className="relative mb-8 h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Orbiting icons */}
            <div className="relative h-24 w-24">
              {[BiBookOpen, BiCode, BsDatabase, BiGlobe, BiServer].map((Icon, index) => (
                <div
                  key={index}
                  className="absolute flex h-10 w-10 items-center justify-center"
                  style={{
                    transform: `rotate(${index * 72 + progress * 3.6}deg) translateX(60px)`,
                    transition: "transform 0.5s ease-out",
                  }}
                >
                  <div
                    className="rounded-full p-2 shadow-md"
                    style={{
                      transform: `rotate(-${index * 72 + progress * 3.6}deg)`,
                      transition: "transform 0.5s ease-out",
                    }}
                  >
                    <Icon className="h-6 w-6 text-[#01589a]" />
                  </div>
                </div>
              ))}

              {/* Center pulsing circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-[#01589a]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full">
                    <div className="h-4 w-4 rounded-full bg-[#01589a]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-4 text-center">
          <p className="font-medium text-[#01589a]">{loadingText}...</p>
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-[#01589a] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <div className="text-center text-sm text-gray-500">{Math.round(progress)}% complete</div>

        {/* Knowledge particles */}
        <div className="relative mt-8 h-20 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-[#01589a] opacity-20"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.animationDuration}s linear infinite`,
                animationDelay: `${particle.animationDelay}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100%) translateX(-10px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100%) translateX(10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
