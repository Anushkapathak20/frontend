"use client"

import data from "@/data/userDashboard.json"
import UserLayout from "../layout-user"

export default function Dashboard(){

 return(

  <UserLayout>

   <div className="p-6 bg-gray-100 min-h-screen">

    <h1 className="text-2xl font-bold mb-6">
     Resident Dashboard
    </h1>

    {/* Summary Cards */}

    <div className="grid grid-cols-3 gap-6 mb-8">

     <div className="bg-white p-6 rounded shadow">
      <h2 className="text-gray-500">Flat</h2>
      <p className="text-xl font-bold">{data.flat}</p>
     </div>

     <div className="bg-white p-6 rounded shadow">
      <h2 className="text-gray-500">Current Month</h2>
      <p className="text-xl font-bold">{data.currentMonth}</p>
     </div>

     <div className="bg-white p-6 rounded shadow">
      <h2 className="text-gray-500">Pending Amount</h2>
      <p className="text-xl font-bold text-red-500">
        ₹{data.pendingAmount}
      </p>
     </div>

    </div>

    {/* Current Status */}

    <div className="bg-white p-6 rounded shadow mb-8">

     <h2 className="text-lg font-semibold mb-2">
       Current Subscription Status
     </h2>

     <p className={`font-bold ${data.status === "Paid" ? "text-green-600":"text-red-500"}`}>
       {data.status}
     </p>

    </div>

    {/* Payment History */}

    <div className="bg-white p-6 rounded shadow mb-8">

     <h2 className="text-lg font-semibold mb-4">
       Payment History
     </h2>

     <table className="w-full">

      <thead>
       <tr className="border-b">
        <th className="p-2">Month</th>
        <th className="p-2">Amount</th>
        <th className="p-2">Status</th>
       </tr>
      </thead>

      <tbody>

       {data.payments.map((p,i)=>(

        <tr key={i} className="border-b">

         <td className="p-2">{p.month}</td>
         <td className="p-2">₹{p.amount}</td>
         <td className="p-2">
          <span className={p.status==="Paid" ? "text-green-600":"text-red-500"}>
            {p.status}
          </span>
         </td>

        </tr>

       ))}

      </tbody>

     </table>

    </div>

    {/* Notifications */}

    <div className="bg-white p-6 rounded shadow">

     <h2 className="text-lg font-semibold mb-4">
       Notifications
     </h2>

     <ul className="list-disc pl-6">

      {data.notifications.map((n,i)=>(
        <li key={i}>{n}</li>
      ))}

     </ul>

    </div>

   </div>

  </UserLayout>

 )

}