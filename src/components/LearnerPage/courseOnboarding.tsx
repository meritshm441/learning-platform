import { ourSolutionData } from "@/data/home"
import { authentication, secureLogin } from "@/lib/constants/images"
import { SolutionItem } from "@/lib/models/ourSolutionsItem"
import Image from "next/image"
import { BiLogIn, BiUpload } from "react-icons/bi"
import { FaArrowDown } from "react-icons/fa"
import { FaGraduationCap } from "react-icons/fa6"

export default function CourseOnboarding() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 px-4 py-8 lg:flex-row lg:px-8 lg:py-16 xl:px-48">
      {/* Left side - Onboarding steps */}
      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        {[
          {
            icon: <BiLogIn className="h-8 w-8" />,
            title: "Sign Up and Choose Your Course",
            desc: "Create your account quickly with just your email or social media login, then explore a wide range",
          },
          {
            icon: <BiUpload className="h-8 w-8" />,
            title: "Onboarding",
            desc: "Get started seamlessly with a smooth onboarding experience. Learn the essentials and set yourself up for success from day one.",
          },
          {
            icon: <FaGraduationCap className="h-8 w-8" />,
            title: "Start Learning",
            desc: "Start your learning journey with practical, hands-on experience. Develop the skills needed to build, implement, and manage effective solutions.",
          },
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full rounded-lg p-6 drop-shadow-md">
              <div className="flex gap-4">
                <div className="text-[#01589A]">{step.icon}</div>
                <div>
                  <h2 className="mb-2 text-lg font-bold lg:text-xl">{step.title}</h2>
                  <p className="text-sm text-gray-700 lg:text-base">{step.desc}</p>
                </div>
              </div>
            </div>
            {index < 2 && <FaArrowDown className="my-2 h-6 w-6 text-[#01589A] lg:h-8 lg:w-8" />}
          </div>
        ))}
      </div>

      {/* Right side - Process and Courses */}
      <div className="flex w-full flex-col overflow-y-auto rounded-lg p-4 drop-shadow-md lg:max-h-[616px] lg:w-1/2 lg:p-2">
        {/* Step 1 & 2 - Secure Login & Authentication */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Step 1 */}
          <div className="flex flex-col items-start">
            <div className="mb-4 flex w-full flex-col items-center">
              <div className="mb-1 text-center text-lg font-bold">1</div>
              <div className="text-center text-sm font-medium">Secure Login</div>
            </div>
            <Image
              src={secureLogin}
              width={195}
              height={136}
              alt="Secure login illustration"
              className="h-auto max-h-[150px] w-auto max-w-full self-start"
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start">
            <div className="mb-4 flex w-full flex-col items-center">
              <div className="mb-1 text-center text-lg font-bold">2</div>
              <div className="text-center text-sm font-medium">Authentication</div>
            </div>
            <Image
              src={authentication}
              width={128}
              height={150}
              alt="Authentication illustration"
              className="h-auto max-h-[150px] w-auto max-w-full self-center"
            />
          </div>
        </div>

        {/* Step 3 - Course Selection */}
        <div className="mb-6 flex w-full flex-col items-center gap-1">
          <div className="text-center text-lg font-bold">3</div>
          <div className="text-center text-sm font-medium">Choose a course</div>
        </div>

        {/* Course Cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ourSolutionData.map(({ id, icon: Icon, title, description, price }: SolutionItem) => (
            <div
              key={id}
              className="group h-full rounded-lg border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col items-start justify-start gap-2 p-3">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#f9fafb]">
                  <Image
                    src={Icon}
                    alt={title}
                    width={30}
                    height={30}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h2 className="text-xs font-bold">{title}</h2>
                <p className="text-left text-[10px] font-normal text-gray-600">{description}</p>
                <div className="flex w-full items-center justify-center font-bold">
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold text-gray-500">
                    <span className="font-medium">Price:</span>
                    <span>{price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
