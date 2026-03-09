"use client"

import Link from "next/link"
import data from "@/data/subscriptionsHistory.json"
import UserLayout from "../layout-user"

export default function Subscriptions() {
  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Monthly Subscription History
          </h1>
          <p className="text-slate-500 mt-1">View your payment records</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                    Month
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                    Payment Mode
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((sub, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {sub.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      ₹{sub.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          sub.status === "Paid"
                            ? "text-emerald-600 font-medium"
                            : "text-rose-600 font-medium"
                        }
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {sub.mode}
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === "Paid" ? (
                        <Link
                          href={`/subscriptions/${sub.month}`}
                          className="text-teal-600 hover:text-teal-700 font-medium"
                        >
                          View Receipt
                        </Link>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
