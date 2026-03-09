"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import data from "@/data/userProfile.json"
import UserLayout from "../layout-user"
export default function Profile(){

 const router = useRouter()

 const [phone,setPhone] = useState(data.phone)
 const [currentPassword,setCurrentPassword] = useState("")
 const [newPassword,setNewPassword] = useState("")

 const updateProfile=(e)=>{
  e.preventDefault()
  alert("Phone number updated successfully")
 }

 const changePassword=(e)=>{
  e.preventDefault()
  alert("Password changed successfully")
 }

 const logout=()=>{
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userPassword")

  router.push("/login")
 }

 return(
<UserLayout>
  <div className="p-6 bg-gray-100 min-h-screen">

   <h1 className="text-2xl font-bold mb-6">
    My Profile
   </h1>

   {/* Profile Info */}

   <div className="bg-white p-6 rounded shadow mb-8">

    <h2 className="text-lg font-semibold mb-4">
      Profile Details
    </h2>

    <p><b>Name:</b> {data.name}</p>
    <p><b>Email:</b> {data.email}</p>

    <form onSubmit={updateProfile} className="mt-4">

     <input
      type="text"
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      className="border p-2 rounded mr-4"
     />

     <button className="bg-blue-600 text-white px-4 py-2 rounded">
      Update Phone
     </button>

    </form>

   </div>


   {/* Change Password */}

   <div className="bg-white p-6 rounded shadow mb-8">

    <h2 className="text-lg font-semibold mb-4">
      Change Password
    </h2>

    <form onSubmit={changePassword}>

     <div className="grid grid-cols-2 gap-4">

      <input
       type="password"
       placeholder="Current Password"
       value={currentPassword}
       onChange={(e)=>setCurrentPassword(e.target.value)}
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

     <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
      Update Password
     </button>

    </form>

   </div>


   {/* Logout */}

   <button
    onClick={logout}
    className="bg-red-600 text-white px-6 py-2 rounded"
   >
    Logout
   </button>

  </div>
</UserLayout>
 )
}