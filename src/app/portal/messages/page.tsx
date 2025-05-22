import { PortalTabs } from "@/components/Portal/portal-tabs"
import { FiSearch, FiUser } from "react-icons/fi"

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: "Course Admin",
      subject: "Welcome to ReactJs Course",
      preview: "Thank you for enrolling in our ReactJs course. We're excited to have you join us!",
      date: "2 days ago",
      unread: true,
    },
    {
      id: 2,
      sender: "John Smith",
      subject: "NodeJs Assignment Feedback",
      preview: "I've reviewed your latest assignment and wanted to provide some feedback...",
      date: "1 week ago",
      unread: false,
    },
    {
      id: 3,
      sender: "Support Team",
      subject: "Your Recent Inquiry",
      preview: "Thank you for contacting our support team. We've received your inquiry about...",
      date: "2 weeks ago",
      unread: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <div className="bg-[#01589a] h-[135px]"></div>

      <main className="flex-1">
        <div className="flex flex-col mx-auto px-4 md:px-20 lg:px-48 gap-8">
          {/* Portal Tabs */}
          <div className="shadow-md rounded-md overflow-hidden -mt-14">
            <PortalTabs />
          </div>

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Messages</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages"
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${message.unread ? "text-[#01589a]" : "text-gray-900"}`}>
                          {message.sender}
                        </p>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                      <p className={`text-sm ${message.unread ? "font-medium" : ""}`}>{message.subject}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{message.preview}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {messages.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No messages found</p>
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  )
}
