/**
 * Repository for handling invoice-related API calls
 */

export interface CreateInvoiceParams {
  learner: string
  amount?: number
  dueDate?: string
  paystackCallbackUrl: string
  paymentDetails?: string
}

export interface InvoiceResponse {
  paymentUrl: InvoiceResponse
  success: boolean
  message: string
  invoice: {
    _id: string
    learner: {
      _id: string
      email: string
      name: string
    }
    track: {
      _id: string
      name: string
      price: number
    }
    amount: number
    dueDate: string
    status: string
    paymentLink: string
    createdAt: string
    updatedAt: string
  }
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
/**
 * Creates a new invoice and initializes a Paystack transaction
 * @returns The invoice data with Paystack payment link
 */
export async function createInvoice(params: CreateInvoiceParams): Promise<InvoiceResponse> {
  const response = await fetch(`${API_BASE_URL}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(
      `Failed to create invoice: ${response.status} ${response.statusText}${
        errorData ? ` - ${JSON.stringify(errorData)}` : ""
      }`,
    )
  }

  return response.json()
}

/**
 * Gets an invoice by ID
 */
export async function getInvoice(invoiceId: string): Promise<InvoiceResponse> {
  const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/invoices/${invoiceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get invoice: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Updates an invoice status to paid
 */
export async function updateInvoiceStatus(
  invoiceId: string,
  data: {
    status: string
    paystackReference: string
    paystackTransactionId: string
  },
): Promise<InvoiceResponse> {
  const response = await fetch(`https://tmp-se-projectapi.azurewebsites.net/api/invoices/${invoiceId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to update invoice status: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/**
 * Verifies a Paystack payment
 * Note: In a real implementation, this would be a server-side call
 */
export async function verifyPaystackPayment(reference: string): Promise<any> {
  // This is a mock implementation since the actual verification should happen server-side
  // In a real app, you would have a server endpoint that verifies with Paystack
  console.log(`Verifying payment with reference: ${reference}`)

  // Simulate a verification response
  return {
    success: true,
    data: {
      reference,
      status: "success",
      transaction_id: "mock_transaction_id",
    },
  }
}
