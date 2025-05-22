import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Invoice = {
  id: number
  name: string
  role: string
  amount: string
  avatar?: string
  initials: string
}

type InvoicesListProps = {
  invoices: Invoice[]
}

export function InvoicesList({ invoices }: InvoicesListProps) {
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
