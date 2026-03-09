"use client"

import { useState } from "react"
import data from "@/data/subscriptions.json"

export default function Subscriptions() {
  const [plans, setPlans] = useState(data)

  const handleChange = (id, value) => {
    const updated = plans.map((plan) =>
      plan.id === id ? { ...plan, amount: value } : plan
    )
    setPlans(updated)
  }

  const handleUpdate = (plan) => {
    alert(`${plan.type} subscription updated to ₹${plan.amount}`)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Subscription Plans
        </h1>
        <p className="text-slate-500 mt-1">Manage flat-type subscription amounts</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat Type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Monthly Amount (₹)
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {plan.type}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={plan.amount}
                      onChange={(e) => handleChange(plan.id, e.target.value)}
                      className="w-32 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdate(plan)}
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Update
                    </button>
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
