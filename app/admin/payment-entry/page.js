"use client"

import { useState, useEffect } from "react"

export default function PaymentEntry() {

  const [payments, setPayments] = useState([])

  const [flat_number, setFlat_number] = useState("")
  const [billing_month, setBilling_month] = useState("")
  const [amount, setAmount] = useState("")
  const [payment_mode, setPayment_mode] = useState("Cash")

  const [notes, setNotes] = useState("")

  // Load payments
  useEffect(() => {
    fetch("http://localhost:5000/api/payments")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPayments(data.data)
        }
      })
  }, [])


  const addPayment = async (e) => {
    e.preventDefault()

    if (!flat_number || !billing_month || !amount) {
      alert("Please fill all required fields")
      return
    }

    try {

      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          flat_number,
          billing_month,
          amount,
          payment_mode
        })
      })

      const data = await res.json()

      

      if (data.success) {

        setPayments([...payments, data.data])

        setFlat_number("")
        setBilling_month("")
        setAmount("")
        setNotes("")

      } else {
        alert(data.error)
      }

    } catch (err) {
      console.error(err)
    }
  }


  const inputClass =
    "px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Manual Payment Entry
        </h1>
        <p className="text-slate-500 mt-1">
          Record payments (payments table) manually
        </p>
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
            value={flat_number}
            onChange={(e) => setFlat_number(e.target.value)}
            className={inputClass}
          />

          <select
            value={billing_month}
            onChange={(e) => setBilling_month(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Month</option>
            <option value="2026-01-01">January</option>
            <option value="2026-02-01">February</option>
            <option value="2026-03-01">March</option>
            <option value="2026-04-01">April</option>
          </select>

          <input
            type="number"
            placeholder="Amount Paid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />

          <select
            value={payment_mode}
            onChange={(e) => setPayment_mode(e.target.value)}
            className={inputClass}
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Cheque</option>
          </select>

          {/* Keeping UI same (payment source not sent to backend) */}
          <select
            className={inputClass}
          >
            <option>Office</option>
            <option>Online</option>
          </select>

        </div>


        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} mt-4 w-full max-w-md`}
        />


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
                  Billing Month
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Amount Paid
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Mode
                </th>



                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Verified
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {payments.map((p) => (

                <tr
                  key={p.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >

                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {p.transaction_id}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {p.flat_number}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(p.billing_month).toLocaleDateString("en-IN",{
                      month:"long",
                      year:"numeric"
                    })}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{p.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                      {p.payment_mode}
                    </span>
                  </td>



                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full
                      ${p.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"}`}
                    >
                      {p.status === "Paid" ? "Yes" : "No"}
                    </span>
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