"use client"

import { useState } from "react"
import data from "@/data/monthlyRecords.json"

export default function MonthlyRecords(){

 const [records,setRecords] = useState(data)
 const [showPending,setShowPending] = useState(false)

 const markPaid=(id)=>{

  const updated = records.map(r =>
   r.id === id ? {...r,status:"Paid"} : r
  )

  setRecords(updated)
 }

 const filteredRecords = showPending
  ? records.filter(r => r.status === "Pending")
  : records

 const totalPending = records
  .filter(r => r.status === "Pending")
  .reduce((sum,r)=> sum + r.amount ,0)

 const paidCount = records.filter(r => r.status === "Paid").length
 const pendingCount = records.filter(r => r.status === "Pending").length

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Monthly Subscription Records
   </h1>

   {/* Summary Cards */}

   <div className="grid grid-cols-3 gap-6 mb-6">

    <div className="bg-green-500 text-white p-4 rounded shadow">
     Paid Flats: {paidCount}
    </div>

    <div className="bg-red-500 text-white p-4 rounded shadow">
     Pending Flats: {pendingCount}
    </div>

    <div className="bg-blue-500 text-white p-4 rounded shadow">
     Pending Amount: ₹{totalPending}
    </div>

   </div>

   {/* Filter */}

   <label className="flex items-center gap-2 mb-4">

    <input
     type="checkbox"
     onChange={()=>setShowPending(!showPending)}
    />

    Show Only Pending Payments

   </label>

   {/* Table */}

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-200">

     <tr>
      <th className="p-3">Flat</th>
      <th className="p-3">Owner</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Status</th>
      <th className="p-3">Action</th>
     </tr>

    </thead>

    <tbody>

     {filteredRecords.map(record => (

      <tr key={record.id} className="border-t">

       <td className="p-3">{record.flat}</td>
       <td className="p-3">{record.owner}</td>
       <td className="p-3">₹{record.amount}</td>

       <td className="p-3">

        {record.status === "Paid"
         ? <span className="text-green-600 font-semibold">Paid</span>
         : <span className="text-red-500 font-semibold">Pending</span>
        }

       </td>

       <td className="p-3">

        {record.status === "Pending" && (

         <button
          onClick={()=>markPaid(record.id)}
          className="bg-green-500 text-white px-3 py-1 rounded"
         >
          Mark as Paid
         </button>

        )}

       </td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}