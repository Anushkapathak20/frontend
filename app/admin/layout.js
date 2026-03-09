"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import { FaBars } from "react-icons/fa"

export default function AdminLayout({ children }) {

 const pathname = usePathname()
 const [open,setOpen] = useState(true)

 const isLoginPage = pathname === "/admin/login"

 return (

  <div className="flex">

   {/* Sidebar hide on login */}
   {!isLoginPage && open && <Sidebar/>}

   <div className="flex-1">

    {/* Top bar hide on login */}
    {!isLoginPage && (
     <div className="flex items-center p-4 bg-white shadow">

      <button
       onClick={()=>setOpen(!open)}
       className="text-2xl mr-4"
      >
       <FaBars/>
      </button>

      <h1 className="text-xl font-semibold">
        Society Admin
      </h1>

     </div>
    )}

    {/* Page Content */}
    <div className={isLoginPage ? "" : "p-6 bg-gray-100 min-h-screen"}>

      {children}

    </div>

   </div>

  </div>

 )
}