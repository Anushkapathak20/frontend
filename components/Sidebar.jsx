import Link from "next/link"

export default function Sidebar(){

 return(

  <div className="w-64 h-screen bg-gray-900 text-white p-6">

   <h2 className="text-lg font-bold mb-6">
    Admin Panel
   </h2>

   <ul className="space-y-4">

    <li><Link href="/admin/dashboard">Dashboard</Link></li>
    <li><Link href="/admin/flats">Flats</Link></li>
    <li><Link href="/admin/subscriptions">Subscriptions</Link></li>
    <li><Link href="/admin/monthly-records">Monthly Records</Link></li>
    <li><Link href="/admin/payment-entry">Payment Entry</Link></li>
    <li><Link href="/admin/reports">Reports</Link></li>
    <li><Link href="/admin/notifications">Notifications</Link></li>
    <li><Link href="/admin/profile">Profile</Link></li>

   </ul>

  </div>

 )
}