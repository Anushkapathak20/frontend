"use client"

import { useState } from "react"
import profileData from "@/data/adminProfile.json"

export default function AdminProfile(){

 const [name,setName] = useState(profileData.name)
 const [email,setEmail] = useState(profileData.email)
 const [phone,setPhone] = useState(profileData.phone)

 const [password,setPassword] = useState("")
 const [newPassword,setNewPassword] = useState("")

 const saveProfile=(e)=>{
  e.preventDefault()
  alert("Profile updated successfully")
 }

 const changePassword=(e)=>{
  e.preventDefault()
  alert("Password changed successfully")
 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Admin Profile
   </h1>


   {/* Profile Update */}

   <form
    onSubmit={saveProfile}
    className="bg-white p-6 rounded shadow mb-8"
   >

    <h2 className="text-lg font-semibold mb-4">
     Update Profile
    </h2>

    <div className="grid grid-cols-3 gap-4">

     <input
      type="text"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      className="border p-2 rounded"
      placeholder="Name"
     />

     <input
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="border p-2 rounded"
      placeholder="Email"
     />

     <input
      type="text"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className="border p-2 rounded"
      placeholder="Phone"
     />

    </div>

    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
     Save Changes
    </button>

   </form>


   {/* Change Password */}

   <form
    onSubmit={changePassword}
    className="bg-white p-6 rounded shadow"
   >

    <h2 className="text-lg font-semibold mb-4">
     Change Password
    </h2>

    <div className="grid grid-cols-2 gap-4">

     <input
      type="password"
      placeholder="Current Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="border p-2 rounded"
     />

     <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e)=>setNewPassword(e.target.value)}
      className="border p-2 rounded"
     />

    </div>

    <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
     Update Password
    </button>

   </form>

  </div>

 )
}