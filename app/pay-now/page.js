"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import data from "@/data/paymentDetails.json"
import UserLayout from "../layout-user"

export default function PayNow() {
  const [paid, setPaid] = useState(false)
  const [method, setMethod] = useState("UPI")
  const [transactionId, setTransactionId] = useState("")

  const handlePayment = () => {
    const id = "TXN" + Math.floor(Math.random() * 1000000)
    setTransactionId(id)
    setPaid(true)
  }

  const downloadReceipt = () => {
    const doc = new jsPDF()
    doc.text("Society Payment Receipt", 20, 20)
    doc.text(`Flat: ${data.flat}`, 20, 40)
    doc.text(`Month: ${data.month}`, 20, 50)
    doc.text(`Amount: ₹${data.amount}`, 20, 60)
    doc.text(`Payment Method: ${method}`, 20, 70)
    doc.text(`Transaction ID: ${transactionId}`, 20, 80)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90)
    doc.save("receipt.pdf")
  }

  return (
    <UserLayout>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900 mb-6">
            Subscription Payment
          </h1>

          {!paid ? (
            <>
              <div className="space-y-3 mb-6">
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Flat:</span>{" "}
                  {data.flat}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Month:</span>{" "}
                  {data.month}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Amount:</span>{" "}
                  ₹{data.amount}
                </p>
              </div>

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-6"
              >
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
              </select>

              <button
                onClick={handlePayment}
                className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Pay Now
              </button>
            </>
          ) : (
            <div>
              <h2 className="text-emerald-600 font-semibold mb-4">
                Payment Successful
              </h2>
              <div className="space-y-2 mb-6">
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">
                    Transaction ID:
                  </span>{" "}
                  {transactionId}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Amount:</span>{" "}
                  ₹{data.amount}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium text-slate-900">Method:</span>{" "}
                  {method}
                </p>
              </div>
              <button
                onClick={downloadReceipt}
                className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Download Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
