"use client"

import { useState, useEffect } from "react"
import jsPDF from "jspdf"

const MONTH_INDEX = {
  January:1, February:2, March:3, April:4, May:5, June:6,
  July:7, August:8, September:9, October:10, November:11, December:12
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

export default function Reports(){

  const [selectedMonth,setSelectedMonth] = useState("March")
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)



  useEffect(()=>{

    const fetchReport = async () => {

      try{

        setLoading(true)
        setError(null)

        const monthNumber = MONTH_INDEX[selectedMonth]

        const res = await fetch(
          `http://localhost:5000/api/reports/yearly?month=${monthNumber}`
        )

        const result = await res.json()

        if(result.success){
          setData(result.data)
        }else{
          setError("Failed to fetch report")
        }

      }catch(err){
        console.error(err)
        setError("Server error")
      }

      setLoading(false)

    }

    fetchReport()

  },[selectedMonth])



  const downloadCSV = () => {

    if(!data) return

    const rows = [
      ["Metric","Value"],
      ["Total Collection",data.total_collection],
      ["Pending Payments",data.pending_payments],
      ["Cash Payments",data.cash_payments],
      ["UPI Payments",data.upi_payments]
    ]

    const csv = rows.map(r=>r.join(",")).join("\n")

    const blob = new Blob([csv],{type:"text/csv"})

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "financial_report.csv"
    link.click()
  }



  const downloadPDF = () => {

    if(!data) return

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Society Financial Report",20,20)

    doc.setFontSize(12)

    doc.text(`Report Till: ${selectedMonth}`,20,40)
    doc.text(`Total Collection: Rs ${data.total_collection}`,20,60)
    doc.text(`Pending Payments: ${data.pending_payments}`,20,70)
    doc.text(`Cash Payments: ${data.cash_payments}`,20,80)
    doc.text(`UPI Payments: ${data.upi_payments}`,20,90)

    doc.save("financial_report.pdf")
  }



  return(

    <div>

      <div className="mb-8">

        <h1 className="text-2xl font-semibold text-slate-900">
          Financial Reports
        </h1>

        <p className="text-slate-500 mt-1">
          Yearly financial overview (January → selected month)
        </p>

      </div>



      <div className="mb-6">

        <select
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg"
        >

          {MONTHS.map(m=>(
            <option key={m} value={m}>
              {m}
            </option>
          ))}

        </select>

      </div>



      {loading && (
        <p className="text-slate-500">Loading report...</p>
      )}



      {error && (
        <p className="text-red-500">{error}</p>
      )}



      {!loading && !error && data && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="p-6 rounded-xl bg-emerald-600 text-white">
            <p className="text-sm opacity-90">Total Collection</p>
            <p className="text-2xl font-bold mt-1">
              Rs.{data.total_collection}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-rose-600 text-white">
            <p className="text-sm opacity-90">Pending Payments</p>
            <p className="text-2xl font-bold mt-1">
              {data.pending_payments}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-teal-600 text-white">
            <p className="text-sm opacity-90">Cash Payments</p>
            <p className="text-2xl font-bold mt-1">
              {data.cash_payments}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-violet-600 text-white">
            <p className="text-sm opacity-90">UPI Payments</p>
            <p className="text-2xl font-bold mt-1">
              {data.upi_payments}
            </p>
          </div>

        </div>

      )}



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