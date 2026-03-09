"use client"

import data from "@/data/reportData.json"
import jsPDF from "jspdf"

export default function Reports() {
  const totalCollection = data
    .filter((r) => r.status === "Paid")
    .reduce((sum, r) => sum + r.amount, 0)
  const pendingPayments = data.filter((r) => r.status === "Pending").length
  const cashPayments = data.filter((r) => r.mode === "Cash").length
  const upiPayments = data.filter((r) => r.mode === "UPI").length

  const downloadCSV = () => {
    const header = "Flat,Month,Amount,Status,Mode\n"
    const rows = data
      .map((r) => `${r.flat},${r.month},${r.amount},${r.status},${r.mode}`)
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "report.csv"
    link.click()
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.text("Society Financial Report", 20, 20)
    let y = 40
    data.forEach((r) => {
      doc.text(
        `${r.flat} | ${r.month} | ₹${r.amount} | ${r.status} | ${r.mode}`,
        20,
        y
      )
      y += 10
    })
    doc.save("report.pdf")
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Financial Reports
        </h1>
        <p className="text-slate-500 mt-1">Overview and export reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-emerald-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Total Collection</p>
          <p className="text-2xl font-bold mt-1">₹{totalCollection}</p>
        </div>
        <div className="p-6 rounded-xl bg-rose-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Pending Payments</p>
          <p className="text-2xl font-bold mt-1">{pendingPayments}</p>
        </div>
        <div className="p-6 rounded-xl bg-teal-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Cash Payments</p>
          <p className="text-2xl font-bold mt-1">{cashPayments}</p>
        </div>
        <div className="p-6 rounded-xl bg-violet-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">UPI Payments</p>
          <p className="text-2xl font-bold mt-1">{upiPayments}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadCSV}
          className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Download CSV
        </button>
        <button
          onClick={downloadPDF}
          className="px-5 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
