"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaUser, FaDollarSign, FaCalendarAlt, FaClock, FaPen } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateInvoiceForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    learner: "",
    amount: "",
    dueDate: "",
    status: "",
    paymentDetails: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/invoices")
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-gray-500">Invoices</h1>
        <span>/</span>
        <h1 className="text-2xl font-bold">Create invoice</h1>
      </div>

      <div className="bg-[#f9f9f9] dark:bg-[#1d1b20] p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaUser />
            </div>
            <Label htmlFor="learner">Select learner</Label>
            <Select value={formData.learner} onValueChange={(value) => handleChange("learner", value)}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select learner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaDollarSign />
            </div>
            <Label htmlFor="amount">Enter amount in USD</Label>
            <Input
              id="amount"
              className="pl-10"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaCalendarAlt />
            </div>
            <Label htmlFor="dueDate">Due date</Label>
            <Input
              id="dueDate"
              type="date"
              className="pl-10"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaClock />
            </div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 text-gray-400">
              <FaPen />
            </div>
            <Label htmlFor="paymentDetails">Payment details</Label>
            <Textarea
              id="paymentDetails"
              className="pl-10 min-h-[100px]"
              value={formData.paymentDetails}
              onChange={(e) => handleChange("paymentDetails", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/invoices")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#01589a] hover:bg-[#01589a]/90">
              Create invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
