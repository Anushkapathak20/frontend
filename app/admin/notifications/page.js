"use client"

import { useState } from "react"
import data from "@/data/notifications.json"

export default function Notifications(){

 const [notifications,setNotifications] = useState(data)

 const [title,setTitle] = useState("")
 const [message,setMessage] = useState("")
 const [month,setMonth] = useState("")
 const [type,setType] = useState("Reminder")
 const [target,setTarget] = useState("All Residents")

 const sendNotification=(e)=>{
  e.preventDefault()

  const newNotification={
   id:Date.now(),
   title,
   message,
   month,
   type,
   target,
   time:new Date().toLocaleString()
  }

  setNotifications([newNotification,...notifications])

  setTitle("")
  setMessage("")
  setMonth("")

  alert("Notification Sent Successfully")
 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Notifications
   </h1>

   {/* Notification Form */}

   <form
    onSubmit={sendNotification}
    className="bg-white p-6 rounded shadow mb-8"
   >

    <div className="grid grid-cols-4 gap-4 mb-4">

     <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      className="border p-2 rounded"
     />

     <select
      value={month}
      onChange={(e)=>setMonth(e.target.value)}
      className="border p-2 rounded"
     >
      <option>Select Month</option>
      <option>January</option>
      <option>February</option>
      <option>March</option>
     </select>

     <select
      value={type}
      onChange={(e)=>setType(e.target.value)}
      className="border p-2 rounded"
     >
      <option>Reminder</option>
      <option>Notice</option>
      <option>Alert</option>
     </select>

     <select
      value={target}
      onChange={(e)=>setTarget(e.target.value)}
      className="border p-2 rounded"
     >
      <option>All Residents</option>
      <option>Specific Flat</option>
     </select>

    </div>

    <textarea
     placeholder="Message"
     value={message}
     onChange={(e)=>setMessage(e.target.value)}
     className="border p-2 rounded w-full mb-4"
    />

    <button className="bg-blue-600 text-white px-6 py-2 rounded">
     Send Notification
    </button>

   </form>


   {/* Notification History */}

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-200">
     <tr>
      <th className="p-3">Title</th>
      <th className="p-3">Type</th>
      <th className="p-3">Target</th>
      <th className="p-3">Month</th>
      <th className="p-3">Time</th>
     </tr>
    </thead>

    <tbody>

     {notifications.map(n => (

      <tr key={n.id} className="border-t">

       <td className="p-3">{n.title}</td>
       <td className="p-3">{n.type}</td>
       <td className="p-3">{n.target}</td>
       <td className="p-3">{n.month}</td>
       <td className="p-3">{n.time}</td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}