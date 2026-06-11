import React from "react"

const Investing = () => {
  return (
    <div
      className="flex h-[222px] w-full items-center justify-center bg-cover bg-center px-8 py-4 sm:px-16 sm:py-6 md:px-32 md:py-8 lg:px-52 lg:py-12"
      style={{
        backgroundImage: `
          linear-gradient(to left, rgba(1, 88, 154, 0.95) 0%, rgba(1, 88, 154, 0.95) 80%, transparent 100%),
          url('/images/investingbg.jpg')
        `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex w-full flex-col gap-3 pr-4 text-left lg:w-2/3">
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            It’s time to start investing in yourself
          </h1>
          <p className="w-[85%] text-base font-normal text-white sm:text-lg">
            Online courses open the opportunity for learning to almost anyone, regardless of their
            scheduling commitments.
          </p>
        </div>
        <div className="mt-4 flex w-full justify-center lg:mt-0 lg:w-auto lg:justify-end">
          <button className="rounded border border-white bg-[#01589A] px-6 py-2 text-white transition-colors hover:bg-[#014273]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Investing
