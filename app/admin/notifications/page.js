"use client"

import { useState } from "react"
import data from "@/data/notifications.json"

export default function Notifications() {
  const [notifications, setNotifications] = useState(data)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [month, setMonth] = useState("")
  const [type, setType] = useState("Reminder")
  const [target, setTarget] = useState("All Residents")

  const sendNotification = (e) => {
    e.preventDefault()
    const newNotification = {
      id: Date.now(),
      title,
      message,
      month,
      type,
      target,
      time: new Date().toLocaleString(),
    }
    setNotifications([newNotification, ...notifications])
    setTitle("")
    setMessage("")
    setMonth("")
    alert("Notification Sent Successfully")
  }

  const inputClass =
    "px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Notifications
        </h1>
        <p className="text-slate-500 mt-1">Send and view society notifications</p>
      </div>

      <form
        onSubmit={sendNotification}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Send Notification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={inputClass}
          >
            <option>Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            <option>Reminder</option>
            <option>Notice</option>
            <option>Alert</option>
          </select>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className={inputClass}
          >
            <option>All Residents</option>
            <option>Specific Flat</option>
          </select>
        </div>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} w-full min-h-[100px] mb-4`}
        />
        <button
          type="submit"
          className="px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Send Notification
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Title
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Target
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Month
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notifications.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {n.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                      {n.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{n.target}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{n.month}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{n.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
