"use client"

import { useState } from "react"
import data from "@/data/notifications.json"

export default function Notifications() {
  const [notifications, setNotifications] = useState(data)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const sendNotification = (e) => {
    e.preventDefault()
    const newNotification = {
      notification_id: Date.now(),
      recipient_id: "broadcast",
      title,
      message,
      is_read: false,
      sent_at: new Date().toISOString(),
    }
    setNotifications([newNotification, ...notifications])
    setTitle("")
    setMessage("")
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
        <p className="text-slate-500 mt-1">
          Send and view notifications (notifications table)
        </p>
      </div>

      <form
        onSubmit={sendNotification}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Send Notification
        </h2>
        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${inputClass} w-full`}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} w-full min-h-[100px]`}
          />
        </div>
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
                  Message
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Read
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Sent At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notifications.map((n) => (
                <tr
                  key={n.notification_id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {n.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{n.message}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full
                        ${n.is_read ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                    >
                      {n.is_read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(n.sent_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
