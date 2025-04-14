import { ourSolutionData } from "@/data/home";
import { authentication, secureLogin } from "@/lib/constants/images";
import { SolutionItem } from "@/lib/models/ourSolutionsItem";
import Image from "next/image";
import { BiLogIn, BiUpload } from "react-icons/bi";
import { FaArrowDown } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

export default function CourseOnboarding() {
  return (
    <div className="min-h-screen w-full bg-white  md:px-48 flex flex-col md:flex-row gap-8 mx-auto p-8">
      {/* Left side - Onboarding steps */}
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        {[
          {
            icon: <BiLogIn className="w-8 h-8" />,
            title: "Sign Up and Choose Your Course",
            desc: "Create your account quickly with just your email or social media login, then explore a wide range",
          },
          {
            icon: <BiUpload className="w-8 h-8" />,
            title: "Onboarding",
            desc: "Get started seamlessly with a smooth onboarding experience. Learn the essentials and set yourself up for success from day one.",
          },
          {
            icon: <FaGraduationCap className="w-8 h-8" />,
            title: "Start Learning",
            desc: "Start your learning journey with practical, hands-on experience. Develop the skills needed to build, implement, and manage effective solutions.",
          },
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white rounded-lg p-6 drop-shadow-md w-full">
              <div className="flex gap-4">
                <div className="text-[#01589A]">{step.icon}</div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-700 text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
            {index < 2 && (
              <FaArrowDown className="w-6 h-6 md:w-8 md:h-8 text-[#01589A] my-2" />
            )}
          </div>
        ))}
      </div>

      {/* Right side - Process and Courses */}
      <div className="bg-white rounded-lg p-4 md:p-2 drop-shadow-md w-full md:w-1/2 flex flex-col md:max-h-[616px] overflow-y-auto">
        {/* Step 1 & 2 - Secure Login & Authentication */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Step 1 */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center w-full mb-4">
              <div className="text-lg font-bold mb-1 text-center">1</div>
              <div className="text-sm text-center font-medium">
                Secure Login
              </div>
            </div>
            <Image
              src={secureLogin}
              width={195}
              height={136}
              alt="Secure login illustration"
              className="w-auto h-auto max-w-full max-h-[150px] self-start"
            />
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center w-full mb-4">
              <div className="text-lg font-bold mb-1 text-center">2</div>
              <div className="text-sm text-center font-medium">
                Authentication
              </div>
            </div>
            <Image
              src={authentication}
              width={128}
              height={150}
              alt="Authentication illustration"
              className="w-auto h-auto max-w-full max-h-[150px] self-center"
            />
          </div>
        </div>

        {/* Step 3 - Course Selection */}
        <div className="w-full flex flex-col items-center gap-1 mb-6">
          <div className="text-lg font-bold text-center">3</div>
          <div className="text-sm font-medium text-center">Choose a course</div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {ourSolutionData.map(
            ({ id, icon: Icon, title, description, price }: SolutionItem) => (
              <div
                key={id}
                className="group bg-white rounded-lg h-full drop-shadow-lg border border-gray-100 transition-all duration-300 hover:drop-shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-start justify-start gap-2 p-3">
                  <div className="flex items-center justify-center w-[30px] h-[30px] bg-[#f9fafb] rounded-full">
                    <Image
                      src={Icon}
                      alt={title}
                      width={30}
                      height={30}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h2 className="font-bold text-xs">{title}</h2>
                  <p className="text-[10px] font-normal text-left text-gray-600">
                    {description}
                  </p>
                  <div className="flex items-center justify-center font-bold w-full">
                    <div className="flex items-center justify-center gap-1 font-semibold text-xs text-gray-500">
                      <span className="font-medium">Price:</span>
                      <span>{price}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
