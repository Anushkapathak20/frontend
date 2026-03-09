"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import data from "@/data/userProfile.json"
import UserLayout from "../layout-user"

export default function Profile() {
  const router = useRouter()
  const [phone, setPhone] = useState(data.phone)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const updateProfile = (e) => {
    e.preventDefault()
    alert("Phone number updated successfully")
  }

  const changePassword = (e) => {
    e.preventDefault()
    alert("Password changed successfully")
  }

  const logout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userPassword")
    router.push("/login")
  }

  const inputClass =
    "px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"

  return (
    <UserLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your account</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Profile Details
          </h2>
          <p className="text-slate-600 mb-2">
            <span className="font-medium text-slate-900">Name:</span> {data.name}
          </p>
          <p className="text-slate-600 mb-4">
            <span className="font-medium text-slate-900">Email:</span>{" "}
            {data.email}
          </p>
          <form onSubmit={updateProfile} className="flex flex-wrap gap-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className={`${inputClass} flex-1 min-w-[200px]`}
            />
            <button
              type="submit"
              className="px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Update Phone
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Change Password
          </h2>
          <form onSubmit={changePassword}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        <button
          onClick={logout}
          className="px-6 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </UserLayout>
  )
}
