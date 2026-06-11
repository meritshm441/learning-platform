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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="h-[135px] bg-[#01589a]"></div>

      <main className="flex-1">
        <div className="mx-auto flex flex-col gap-8 px-4 md:px-20 lg:px-48">
          {/* Portal Tabs */}
          <div className="-mt-14 overflow-hidden rounded-md shadow-md">
            <PortalTabs />
          </div>

          <div className="overflow-hidden rounded-md bg-white shadow-md">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Messages</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages"
                    className="rounded-md border border-gray-300 py-2 pr-4 pl-9"
                  />
                  <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`cursor-pointer p-4 hover:bg-gray-50 ${message.unread ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                        <FiUser className="text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${message.unread ? "text-[#01589a]" : "text-gray-900"}`}
                        >
                          {message.sender}
                        </p>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                      <p className={`text-sm ${message.unread ? "font-medium" : ""}`}>
                        {message.subject}
                      </p>
                      <p className="line-clamp-1 text-sm text-gray-500">{message.preview}</p>
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
