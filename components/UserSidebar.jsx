"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChartLine, FaFileInvoiceDollar, FaCreditCard, FaUser } from "react-icons/fa"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FaChartLine },
  { href: "/subscriptions", label: "Subscriptions", icon: FaFileInvoiceDollar },
  { href: "/pay-now", label: "Pay Now", icon: FaCreditCard },
  { href: "/profile", label: "Profile", icon: FaUser },
]

export default function UserSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Resident Portal
        </h2>
        <p className="text-xs text-slate-400 mt-1">Society Subscriptions</p>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? "bg-teal-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-90" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
