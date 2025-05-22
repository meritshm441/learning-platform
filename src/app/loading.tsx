"use client"

import { useEffect, useState } from "react"
import { BiBookOpen, BiCode, BiGlobe, BiServer } from "react-icons/bi"
import { BsDatabase } from "react-icons/bs"
import { LuSparkles } from "react-icons/lu"

export default function Loading() {
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
    <div className="fixed inset-0 flex flex-col items-center justify-center  z-50">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-[#01589a] text-4xl font-bold flex items-center">
            <span>CLient</span>
            <LuSparkles className="ml-2 h-6 w-6 text-[#d89614] animate-pulse" />
          </div>
        </div>

        {/* Animated Icons */}
        <div className="relative h-32 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Orbiting icons */}
            <div className="relative w-24 h-24">
              {[BiBookOpen, BiCode, BsDatabase, BiGlobe, BiServer].map((Icon, index) => (
                <div
                  key={index}
                  className="absolute w-10 h-10 flex items-center justify-center"
                  style={{
                    transform: `rotate(${index * 72 + progress * 3.6}deg) translateX(60px)`,
                    transition: "transform 0.5s ease-out",
                  }}
                >
                  <div
                    className=" rounded-full p-2 shadow-md"
                    style={{
                      transform: `rotate(-${index * 72 + progress * 3.6}deg)`,
                      transition: "transform 0.5s ease-out",
                    }}
                  >
                    <Icon className="w-6 h-6 text-[#01589a]" />
                  </div>
                </div>
              ))}

              {/* Center pulsing circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-[#01589a] rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#01589a] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center mb-4">
          <p className="text-[#01589a] font-medium">{loadingText}...</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className="bg-[#01589a] h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <div className="text-center text-sm text-gray-500">{Math.round(progress)}% complete</div>

        {/* Knowledge particles */}
        <div className="relative h-20 mt-8 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#01589a] opacity-20 rounded-full"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 5 + 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
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
