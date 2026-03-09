"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import { FaBars } from "react-icons/fa"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const isLoginPage = pathname === "/admin/login"

  return (
    <div className="flex max-h-screen bg-slate-50 w-screen">
      {!isLoginPage && open && <Sidebar />}

      <div className="flex-1 flex flex-col min-w-0 w-screen">
        {!isLoginPage && (
          <header className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 bg-white border-b border-slate-200 shadow-sm">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Toggle sidebar"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-slate-900">Society Admin</h1>
              <p className="text-sm text-slate-500">Manage your society efficiently</p>
            </div>
          </header>
        )}

        <main className={isLoginPage ? "flex-1" : "flex-1 p-6"}>
          {children}
        </main>
      </div>
    </div>
  )
}