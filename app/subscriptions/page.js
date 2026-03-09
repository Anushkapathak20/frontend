"use client"

import Link from "next/link"
import data from "@/data/subscriptionsHistory.json"
import UserLayout from "../layout-user"
export default function Subscriptions(){

 return(
  <UserLayout>
  <div className="p-6 bg-gray-100 min-h-screen">

   <h1 className="text-2xl font-bold mb-6">
    Monthly Subscription History
   </h1>

   <div className="bg-white p-6 rounded shadow">

    <table className="w-full">

     <thead>
      <tr className="border-b">
       <th className="p-3">Month</th>
       <th className="p-3">Amount</th>
       <th className="p-3">Status</th>
       <th className="p-3">Payment Mode</th>
       <th className="p-3">Receipt</th>
      </tr>
     </thead>

     <tbody>

      {data.map((sub,i)=>(

       <tr key={i} className="border-b">

        <td className="p-3">{sub.month}</td>

        <td className="p-3">₹{sub.amount}</td>

        <td className="p-3">
         <span
          className={
           sub.status==="Paid"
            ? "text-green-600 font-semibold"
            : "text-red-500 font-semibold"
          }
         >
          {sub.status}
         </span>
        </td>

        <td className="p-3">{sub.mode}</td>

        <td className="p-3">

         {sub.status==="Paid"
          ? (
            <Link
             href={`/subscriptions/${sub.month}`}
             className="text-blue-600 underline"
            >
             View Receipt
            </Link>
           )
          : "-"
         }

        </td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </div>
   </UserLayout>
 )
}