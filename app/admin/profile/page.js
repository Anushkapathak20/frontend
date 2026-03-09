"use client"

import { useState } from "react"
import profileData from "@/data/adminProfile.json"

export default function AdminProfile() {
  const [name, setName] = useState(profileData.name)
  const [email, setEmail] = useState(profileData.email)
  const [phone, setPhone] = useState(profileData.phone)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const saveProfile = (e) => {
    e.preventDefault()
    alert("Profile updated successfully")
  }

  const changePassword = (e) => {
    e.preventDefault()
    alert("Password changed successfully")
  }

  const inputClass =
    "px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account settings</p>
      </div>

      <form
        onSubmit={saveProfile}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Update Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={inputClass}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
      </form>

      <form
        onSubmit={changePassword}
        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Change Password
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
  )
}
