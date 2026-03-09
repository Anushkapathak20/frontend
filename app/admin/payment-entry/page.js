"use client"

import { useState } from "react"
import data from "@/data/payments.json"

export default function PaymentEntry() {
  const [payments, setPayments] = useState(data)
  const [flat, setFlat] = useState("")
  const [month, setMonth] = useState("")
  const [amount, setAmount] = useState("")
  const [mode, setMode] = useState("Cash")
  const [notes, setNotes] = useState("")

  const addPayment = (e) => {
    e.preventDefault()
    if (!flat || !month || !amount) {
      alert("Please fill all required fields")
      return
    }
    const exists = payments.some((p) => p.flat === flat && p.month === month)
    if (exists) {
      alert("Payment already recorded for this flat for this month")
      return
    }
    const newPayment = {
      id: Date.now(),
      transactionId: "TXN" + Date.now(),
      flat,
      month,
      amount,
      mode,
      notes,
      date: new Date().toLocaleDateString(),
    }
    setPayments([...payments, newPayment])
    setFlat("")
    setMonth("")
    setAmount("")
    setNotes("")
  }

  const inputClass =
    "px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Manual Payment Entry
        </h1>
        <p className="text-slate-500 mt-1">Record payments manually</p>
      </div>

      <form
        onSubmit={addPayment}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Add Payment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Flat Number"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            className={inputClass}
          />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={inputClass}
          >
            <option>Cash</option>
            <option>UPI</option>
          </select>
          <input
            type="text"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Record Payment
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Transaction ID
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Month
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Mode
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {p.transactionId}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.flat}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.month}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{p.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                      {p.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
