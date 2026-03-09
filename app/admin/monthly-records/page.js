"use client"

import { useState } from "react"
import data from "@/data/monthlyRecords.json"

export default function MonthlyRecords() {
  const [records, setRecords] = useState(data)
  const [showPending, setShowPending] = useState(false)

  const markPaid = (id) => {
    const updated = records.map((r) =>
      r.id === id ? { ...r, status: "Paid" } : r
    )
    setRecords(updated)
  }

  const filteredRecords = showPending
    ? records.filter((r) => r.status === "Pending")
    : records

  const totalPending = records
    .filter((r) => r.status === "Pending")
    .reduce((sum, r) => sum + r.amount, 0)

  const paidCount = records.filter((r) => r.status === "Paid").length
  const pendingCount = records.filter((r) => r.status === "Pending").length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Monthly Subscription Records
        </h1>
        <p className="text-slate-500 mt-1">Track payments and mark as paid</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="p-6 rounded-xl bg-emerald-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Paid Flats</p>
          <p className="text-2xl font-bold mt-1">{paidCount}</p>
        </div>
        <div className="p-6 rounded-xl bg-rose-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Pending Flats</p>
          <p className="text-2xl font-bold mt-1">{pendingCount}</p>
        </div>
        <div className="p-6 rounded-xl bg-teal-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Pending Amount</p>
          <p className="text-2xl font-bold mt-1">₹{totalPending}</p>
        </div>
      </div>

      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={showPending}
          onChange={() => setShowPending(!showPending)}
          className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
        />
        <span className="text-sm font-medium text-slate-700">
          Show only pending payments
        </span>
      </label>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Owner
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {record.flat}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {record.owner}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{record.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full
                        ${record.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {record.status === "Pending" && (
                      <button
                        onClick={() => markPaid(record.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
