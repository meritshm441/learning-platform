import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function InvoicesList() {
  const invoices = [
    {
      id: 1,
      name: "Jane Cooper",
      role: "Software Developer",
      amount: "$420.00",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JC",
    },
    {
      id: 2,
      name: "Savannah Nguyen",
      role: "Data Science",
      amount: "$420.00",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SN",
    },
    {
      id: 3,
      name: "Jerome Bell",
      role: "Data Science",
      amount: "$420.00",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JB",
    },
    {
      id: 4,
      name: "Theresa Webb",
      role: "Cloud Engineer",
      amount: "$420.00",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TW",
    },
    {
      id: 5,
      name: "Ralph Edwards",
      role: "Software Developer",
      amount: "$420.00",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RE",
    },
  ]

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={invoice.avatar || "/placeholder.svg"} alt={invoice.name} />
              <AvatarFallback>{invoice.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{invoice.name}</p>
              <p className="text-sm text-[#666666] dark:text-[#999999]">{invoice.role}</p>
            </div>
          </div>
          <div className="font-medium">{invoice.amount}</div>
        </div>
      ))}
    </div>
  )
}
