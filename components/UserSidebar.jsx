"use client"

import Link from "next/link"

export default function UserSidebar(){

 return(

  <div className="w-64 h-screen bg-blue-900 text-white p-6">

   <h2 className="text-xl font-bold mb-8">
    Resident Portal
   </h2>

   <ul className="space-y-4">

    <li>
     <Link href="/dashboard">Dashboard</Link>
    </li>

    <li>
     <Link href="/subscriptions">Subscriptions</Link>
    </li>

    <li>
     <Link href="/pay-now">Pay Now</Link>
    </li>

    <li>
     <Link href="/profile">Profile</Link>
    </li>

   </ul>

  </div>

 )

}