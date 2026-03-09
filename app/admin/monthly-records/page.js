"use client"

import { useState } from "react"
import data from "@/data/monthlyRecords.json"

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function MonthlyRecords() {
  const [records, setRecords] = useState(data)
  const [selectedMonth, setSelectedMonth] = useState(ALL_MONTHS[0])
  const [showPending, setShowPending] = useState(false)

  const markPaid = (id) => {
    const updated = records.map((r) =>
      r.id === id ? { ...r, status: "Paid" } : r
    )
    setRecords(updated)
  }

  const monthRecords = records.filter((r) =>
    selectedMonth ? r.month === selectedMonth : true
  )

  const filteredRecords = showPending
    ? monthRecords.filter((r) => r.status === "Pending")
    : monthRecords

  const totalPending = monthRecords
    .filter((r) => r.status === "Pending")
    .reduce((sum, r) => sum + r.amount, 0)

  const paidCount = monthRecords.filter((r) => r.status === "Paid").length
  const pendingCount = monthRecords.filter((r) => r.status === "Pending").length

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Monthly Subscription Records
          </h1>
          <p className="text-slate-500 mt-1">
            Shows each flat&apos;s payment status and lets you mark subscriptions as paid.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[160px]"
          >
            {ALL_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
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

      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <label className="flex items-center gap-3 cursor-pointer">
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
        {selectedMonth && (
          <span className="text-xs text-slate-500">
            Showing {filteredRecords.length} records for {selectedMonth}
          </span>
        )}
      </div>

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
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-6 text-center text-sm text-slate-500"
                  >
                    No records for {selectedMonth}.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
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
                          ${
                            record.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
