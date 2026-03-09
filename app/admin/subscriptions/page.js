"use client"

import { useState } from "react"
import data from "@/data/subscriptions.json"

export default function Subscriptions(){

 const [plans,setPlans] = useState(data)

 const handleChange = (id,value)=>{
  const updated = plans.map(plan =>
   plan.id === id ? {...plan,amount:value} : plan
  )

  setPlans(updated)
 }

 const handleUpdate = (plan)=>{
  alert(`${plan.type} subscription updated to ₹${plan.amount}`)
 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Subscription Plans
   </h1>

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-200">
     <tr>
      <th className="p-3">Flat Type</th>
      <th className="p-3">Monthly Amount (₹)</th>
      <th className="p-3">Action</th>
     </tr>
    </thead>

    <tbody>

     {plans.map(plan => (

      <tr key={plan.id} className="border-t">

       <td className="p-3 font-semibold">
        {plan.type}
       </td>

       <td className="p-3">

        <input
         type="number"
         value={plan.amount}
         onChange={(e)=>handleChange(plan.id,e.target.value)}
         className="border p-2 rounded w-32"
        />

       </td>

       <td className="p-3">

        <button
         onClick={()=>handleUpdate(plan)}
         className="bg-blue-500 text-white px-4 py-1 rounded"
        >
         Update
        </button>

       </td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}