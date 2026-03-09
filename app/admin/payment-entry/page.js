"use client"

import { useState } from "react"
import data from "@/data/payments.json"

export default function PaymentEntry(){

 const [payments,setPayments] = useState(data)

 const [flat,setFlat] = useState("")
 const [month,setMonth] = useState("")
 const [amount,setAmount] = useState("")
 const [mode,setMode] = useState("Cash")
 const [notes,setNotes] = useState("")

 const addPayment=(e)=>{
  e.preventDefault()

  if(!flat || !month || !amount){
   alert("Please fill all required fields")
   return
  }

  const exists = payments.some(
   p => p.flat === flat && p.month === month
  )

  if(exists){
   alert("Payment already recorded for this flat for this month")
   return
  }

  const newPayment = {
   id: Date.now(),
   transactionId: "TXN"+Date.now(),
   flat,
   month,
   amount,
   mode,
   notes,
   date: new Date().toLocaleDateString()
  }

  setPayments([...payments,newPayment])

  setFlat("")
  setMonth("")
  setAmount("")
  setNotes("")
 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Manual Payment Entry
   </h1>

   {/* Payment Form */}

   <form
    onSubmit={addPayment}
    className="bg-white p-6 rounded shadow mb-8"
   >

    <div className="grid grid-cols-5 gap-4">

     <input
      type="text"
      placeholder="Flat Number"
      value={flat}
      onChange={(e)=>setFlat(e.target.value)}
      className="border p-2 rounded"
     />

     <select
      value={month}
      onChange={(e)=>setMonth(e.target.value)}
      className="border p-2 rounded"
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
      onChange={(e)=>setAmount(e.target.value)}
      className="border p-2 rounded"
     />

     <select
      value={mode}
      onChange={(e)=>setMode(e.target.value)}
      className="border p-2 rounded"
     >
      <option>Cash</option>
      <option>UPI</option>
     </select>

     <input
      type="text"
      placeholder="Notes"
      value={notes}
      onChange={(e)=>setNotes(e.target.value)}
      className="border p-2 rounded"
     />

    </div>

    <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded">
     Record Payment
    </button>

   </form>

   {/* Payment History */}

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-200">

     <tr>
      <th className="p-3">Transaction ID</th>
      <th className="p-3">Flat</th>
      <th className="p-3">Month</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Mode</th>
      <th className="p-3">Date</th>
      <th className="p-3">Notes</th>
     </tr>

    </thead>

    <tbody>

     {payments.map(p => (

      <tr key={p.id} className="border-t">

       <td className="p-3">{p.transactionId}</td>
       <td className="p-3">{p.flat}</td>
       <td className="p-3">{p.month}</td>
       <td className="p-3">₹{p.amount}</td>
       <td className="p-3">{p.mode}</td>
       <td className="p-3">{p.date}</td>
       <td className="p-3">{p.notes}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}