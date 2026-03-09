"use client"

import data from "@/data/userDashboard.json"
import UserLayout from "../layout-user"

export default function Dashboard() {
  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Resident Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Your subscription overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">Flat</h2>
            <p className="text-xl font-bold text-slate-900 mt-2">{data.flat}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">
              Current Month
            </h2>
            <p className="text-xl font-bold text-slate-900 mt-2">
              {data.currentMonth}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500">
              Pending Amount
            </h2>
            <p className="text-xl font-bold text-rose-600 mt-2">
              ₹{data.pendingAmount}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Current Subscription Status
          </h2>
          <p
            className={`font-bold ${
              data.status === "Paid" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {data.status}
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
                    Month
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 px-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.payments.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {p.month}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      ₹{p.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          p.status === "Paid"
                            ? "text-emerald-600 font-medium"
                            : "text-rose-600 font-medium"
                        }
                      >
                        {p.status}
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
            {data.notifications.map((n, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </UserLayout>
  )
}
