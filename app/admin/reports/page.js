"use client"

import data from "@/data/reportData.json"
import jsPDF from "jspdf"

export default function Reports(){

 const totalCollection = data
  .filter(r=>r.status==="Paid")
  .reduce((sum,r)=>sum+r.amount,0)

 const pendingPayments = data
  .filter(r=>r.status==="Pending").length

 const cashPayments = data
  .filter(r=>r.mode==="Cash").length

 const upiPayments = data
  .filter(r=>r.mode==="UPI").length


 const downloadCSV = ()=>{

  const header = "Flat,Month,Amount,Status,Mode\n"

  const rows = data.map(
   r => `${r.flat},${r.month},${r.amount},${r.status},${r.mode}`
  ).join("\n")

  const csvContent = header + rows

  const blob = new Blob([csvContent],{type:"text/csv"})

  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")

  link.href = url
  link.download = "report.csv"
  link.click()

 }


 const downloadPDF = ()=>{

  const doc = new jsPDF()

  doc.text("Society Financial Report",20,20)

  let y = 40

  data.forEach(r=>{

   doc.text(
    `${r.flat} | ${r.month} | ₹${r.amount} | ${r.status} | ${r.mode}`,
    20,
    y
   )

   y += 10

  })

  doc.save("report.pdf")

 }


 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Financial Reports
   </h1>


   <div className="grid grid-cols-4 gap-6 mb-8">

    <div className="bg-green-500 text-white p-4 rounded">
     Total Collection
     <p className="text-xl font-bold">₹{totalCollection}</p>
    </div>

    <div className="bg-red-500 text-white p-4 rounded">
     Pending Payments
     <p className="text-xl font-bold">{pendingPayments}</p>
    </div>

    <div className="bg-blue-500 text-white p-4 rounded">
     Cash Payments
     <p className="text-xl font-bold">{cashPayments}</p>
    </div>

    <div className="bg-purple-500 text-white p-4 rounded">
     UPI Payments
     <p className="text-xl font-bold">{upiPayments}</p>
    </div>

   </div>


   <div className="space-x-4">

    <button
     onClick={downloadCSV}
     className="bg-blue-600 text-white px-4 py-2 rounded"
    >
     Download CSV
    </button>


    <button
     onClick={downloadPDF}
     className="bg-red-600 text-white px-4 py-2 rounded"
    >
     Download PDF
    </button>

   </div>

  </div>

 )
}