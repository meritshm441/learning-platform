import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/constants/utils"

type Invoice = {
  _id: string
  learner: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profileImage?: string
  }
  amount: number
  status: string
  createdAt: string
  paidAt?: string
}

type InvoicesListProps = {
  invoices: Invoice[]
}

export function InvoicesList({ invoices }: InvoicesListProps) {
  if (invoices.length === 0) {
    return <div className="text-center py-4">No invoices found</div>
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice._id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {invoice.learner.profileImage ? (
                <AvatarImage
                  src={invoice.learner.profileImage || "/placeholder.svg"}
                  alt={`${invoice.learner.firstName} ${invoice.learner.lastName}`}
                />
              ) : (
                <AvatarFallback className="bg-[#01589a] text-white">
                  {invoice.learner.firstName?.[0]}
                  {invoice.learner.lastName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">
                {invoice.learner.firstName} {invoice.learner.lastName}
              </p>
              <p className="text-sm text-[#666666] dark:text-[#999999]">
                {formatDate(invoice.paidAt || invoice.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-medium">${invoice.amount.toLocaleString()}</div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                invoice.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
