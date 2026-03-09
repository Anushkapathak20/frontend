"use client"

import { useState } from "react"
import data from "@/data/reportData.json"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function Reports() {

  const [selectedMonth,setSelectedMonth] = useState("All")

  const filteredData =
    selectedMonth === "All"
      ? data
      : data.filter((r) => r.month === selectedMonth)

  const totalCollection = filteredData
    .filter((r) => r.status === "Paid")
    .reduce((sum, r) => sum + r.amount, 0)

  const pendingPayments = filteredData.filter(
    (r) => r.status === "Pending"
  ).length

  const cashPayments = filteredData.filter(
    (r) => r.mode === "Cash"
  ).length

  const upiPayments = filteredData.filter(
    (r) => r.mode === "UPI"
  ).length


  // CSV DOWNLOAD
  const downloadCSV = () => {
    const header = "Flat,Month,Amount,Status,Mode\n"

    const rows = filteredData
      .map(
        (r) =>
          `${r.flat},${r.month},${r.amount},${r.status},${r.mode}`
      )
      .join("\n")

    const blob = new Blob([header + rows], {
      type: "text/csv",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "financial_report.csv"
    link.click()
  }


  // PDF DOWNLOAD
  const downloadPDF = () => {

    const doc = new jsPDF()
  
    doc.setFontSize(18)
    doc.text("Society Financial Report", 20, 20)
  
    doc.setFontSize(12)
    doc.text(`Month: ${selectedMonth}`, 20, 30)
    const tableColumn = ["Flat", "Month", "Amount", "Status", "Mode"]
  
    const tableRows = filteredData.map((r) => [
      r.flat,
      r.month,
      `Rs. ${r.amount}`,
      r.status,
      r.mode
    ])
  
    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    })
  
    doc.save("financial_report.pdf")
  }


  const months = ["All","January","February","March","April","May","June","July","August","September","October","November","December"]

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Financial Reports
        </h1>
        <p className="text-slate-500 mt-1">
          Monthly and yearly financial overview
        </p>
      </div>


      {/* MONTH FILTER */}
      <div className="mb-6">
        <select
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {months.map((m)=>(
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>


      {/* REPORT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="p-6 rounded-xl bg-emerald-600 text-white shadow-sm">
          <p className="text-sm opacity-90">Total Collection</p>
          <p className="text-2xl font-bold mt-1">
            Rs.{totalCollection}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-rose-600 text-white shadow-sm">
          <p className="text-sm opacity-90">Pending Payments</p>
          <p className="text-2xl font-bold mt-1">
            {pendingPayments}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-teal-600 text-white shadow-sm">
          <p className="text-sm opacity-90">Cash Payments</p>
          <p className="text-2xl font-bold mt-1">
            {cashPayments}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-violet-600 text-white shadow-sm">
          <p className="text-sm opacity-90">UPI Payments</p>
          <p className="text-2xl font-bold mt-1">
            {upiPayments}
          </p>
        </div>

      </div>


      {/* DOWNLOAD BUTTONS */}
      <div className="flex gap-4">

        <button
          onClick={downloadCSV}
          className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Download CSV
        </button>

        <button
          onClick={downloadPDF}
          className="px-5 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700"
        >
          Download PDF
        </button>

      </div>

    </div>
  )
}