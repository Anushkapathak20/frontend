"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import UserLayout from "../../layout-user"
import formatMonth from "@/utils/formatMonth"
import Link from "next/link"

export default function Receipt() {
  const { month } = useParams()
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("residentUser")
    if (!storedUser) {
      setError("Please log in to view your receipt.")
      setLoading(false)
      return
    }
    const user = JSON.parse(storedUser)
    if (!user?.email) {
      setError("User data not found.")
      setLoading(false)
      return
    }

    const monthParam = month?.length === 7 ? `${month}-01` : month
    fetch(
      `http://localhost:5000/api/resident/receipt?email=${encodeURIComponent(user.email)}&month=${encodeURIComponent(monthParam)}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setReceipt(res.data)
        } else {
          setError(res.error || "Failed to load receipt.")
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load receipt.")
      })
      .finally(() => setLoading(false))
  }, [month])

  const formatDate = (dateStr) => {
    if (!dateStr) return "—"
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <p className="text-slate-500">Loading receipt...</p>
        </div>
      </UserLayout>
    )
  }

  if (error || !receipt) {
    return (
      <UserLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            {formatMonth(month)} Subscription Receipt
          </h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <p className="text-rose-600 mb-4">{error || "No receipt found for this month."}</p>
          <Link
            href="/subscriptions"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
             Back to Subscriptions
          </Link>
        </div>
      </UserLayout>
    )
  }

  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            {formatMonth(receipt.billing_month)} Subscription Receipt
          </h1>
          <p className="text-slate-500 mt-1">Payment receipt details</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <div className="space-y-4">
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Flat:</span>{" "}
              {receipt.flat_number || "—"}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Month:</span>{" "}
              {formatMonth(receipt.billing_month)}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Maintenance Charge:</span>{" "}
              ₹{receipt.amount_due ?? receipt.amount ?? "—"}
            </p>
            <p
              className={
                receipt.status === "Paid"
                  ? "text-emerald-600 font-semibold"
                  : "text-rose-600 font-semibold"
              }
            >
              Status: {receipt.status || "—"}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Payment Mode:</span>{" "}
              {receipt.payment_mode || "—"}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Payment Date:</span>{" "}
              {formatDate(receipt.payment_date)}
            </p>
            {receipt.transaction_id && (
              <p className="text-slate-600">
                <span className="font-medium text-slate-900">Transaction ID:</span>{" "}
                {receipt.transaction_id}
              </p>
            )}
          </div>
          <Link
            href="/subscriptions"
            className="inline-block mt-6 text-teal-600 hover:text-teal-700 font-medium"
          >
             Back to Subscriptions
          </Link>
        </div>
      </div>
    </UserLayout>
  )
}
