"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FaChartLine,
  FaBuilding,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaChartBar,
  FaBell,
  FaUser,
} from "react-icons/fa"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaChartLine },
  { href: "/admin/flats", label: "Flats", icon: FaBuilding },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: FaFileInvoiceDollar },
  { href: "/admin/monthly-records", label: "Monthly Records", icon: FaCalendarAlt },
  { href: "/admin/payment-entry", label: "Payment Entry", icon: FaMoneyCheckAlt },
  { href: "/admin/reports", label: "Reports", icon: FaChartBar },
  { href: "/admin/notifications", label: "Notifications", icon: FaBell },
  { href: "/admin/profile", label: "Profile", icon: FaUser },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Admin Panel
        </h2>
        <p className="text-xs text-slate-400 mt-1">Society Management</p>
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