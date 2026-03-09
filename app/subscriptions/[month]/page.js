"use client"

import { use } from "react"
import UserLayout from "../../layout-user"

export default function Receipt({ params }) {
  const { month } = use(params)

  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            {month} Subscription Receipt
          </h1>
          <p className="text-slate-500 mt-1">Payment receipt details</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <div className="space-y-4">
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Month:</span> {month}
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">
                Maintenance Charge:
              </span>{" "}
              ₹1500
            </p>
            <p className="text-emerald-600 font-semibold">Status: Paid</p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Payment Mode:</span>{" "}
              UPI
            </p>
            <p className="text-slate-600">
              <span className="font-medium text-slate-900">Payment Date:</span> 10{" "}
              {month}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
