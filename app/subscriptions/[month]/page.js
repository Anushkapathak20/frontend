"use client"

import { use } from "react"

export default function Receipt({ params }) {

 const { month } = use(params)

 return (

  <div className="p-6 bg-gray-100 min-h-screen">

   <h1 className="text-2xl font-bold mb-6">
    {month} Subscription Receipt
   </h1>

   <div className="bg-white p-6 rounded shadow w-96">

    <p className="mb-2">
     <strong>Month:</strong> {month}
    </p>

    <p className="mb-2">
     <strong>Maintenance Charge:</strong> ₹1500
    </p>

    <p className="mb-2 text-green-600 font-semibold">
     Status: Paid
    </p>

    <p className="mb-2">
     <strong>Payment Mode:</strong> UPI
    </p>

    <p>
     <strong>Payment Date:</strong> 10 {month}
    </p>

   </div>

  </div>

 )
}