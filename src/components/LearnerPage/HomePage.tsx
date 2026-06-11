import HeroSection from "./HeroSection"
import OurSolution from "./OurSolution"
import NextStep from "./NextStep"
import Proud from "./Proud"
import Investing from "./Investing"
import CourseOnboarding from "./courseOnboarding"

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {/* Hero Section */}
      <HeroSection />
      <OurSolution />
      <NextStep />
      <Proud />
      <Investing />
      <CourseOnboarding />
    </div>
  )
}
