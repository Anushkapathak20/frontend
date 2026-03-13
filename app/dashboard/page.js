"use client"

import { useEffect, useState } from "react"
import UserLayout from "../layout-user"
import formatMonth from "@/utils/formatMonth.js";
export default function Dashboard() {

  const [data, setData] = useState(null)
  const [payments, setPayments] = useState([])

  useEffect(() => {

    const storedUser = localStorage.getItem("residentUser")

    if (!storedUser) return

    const user = JSON.parse(storedUser)

    console.log("Fetching dashboard data for:", user)

    fetch(`http://localhost:5000/api/resident/dashboard?email=${user.email}`)
      .then(res => res.json())
      .then(res => {
         console.log("API response:", res)
         if (!res.success) {
           console.error("Dashboard API error:", res.error)
           return
         }
         setData(res.summary ?? null)  // summary uses current real-world month
         setPayments(res.data ?? [])   // payment history table
      })
      .catch(err => console.error("Error fetching dashboard data:", err))

  }, [])
  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Resident Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Your subscription overview (flats + monthly_records + payments)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">Flat</h2>
            <p className="text-xl font-bold text-slate-900 mt-2">
              {data?.flat_number}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">
              Billing Month
            </h2>
            <p className="text-xl font-bold text-slate-900 mt-2">
              {formatMonth(data?.billing_month)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">
              Amount Due
            </h2>
            <p className="text-xl font-bold text-rose-600 mt-2">
              {data?.amount_due != null ? `₹${data.amount_due}` : "-"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Current Subscription Status
          </h2>
          <p
            className={`font-bold ${
              data?.status === "Paid" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {data?.status}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                    Billing Month
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                    Amount Paid
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {formatMonth(p?.billing_month)}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {p?.amount_paid != null ? `₹${p.amount_paid}` : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          p?.status === "Paid"
                            ? "text-emerald-600 font-medium"
                            : "text-rose-600 font-medium"
                        }
                      >
                        {p?.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Notifications
          </h2>
          <ul className="space-y-2 text-slate-600">
            {data?.notifications?.map((n, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>
                  <strong>{n?.title}:</strong> {n?.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </UserLayout>
  )
}
