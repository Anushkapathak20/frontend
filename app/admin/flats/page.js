"use client"

import { useState } from "react"
import flatsData from "@/data/flats.json"

export default function Flats(){

 const [flats,setFlats] = useState(flatsData)
 const [search,setSearch] = useState("")
 const [showModal,setShowModal] = useState(false)

 const [form,setForm] = useState({
  flat:"",
  owner:"",
  email:"",
  phone:"",
  type:""
 })

 const filteredFlats = flats.filter(f =>
  f.owner.toLowerCase().includes(search.toLowerCase())
 )

 const deleteFlat=(id)=>{
  setFlats(flats.filter(f=>f.id!==id))
 }

 const handleSubmit=(e)=>{
  e.preventDefault()

  const newFlat={
   id:Date.now(),
   ...form
  }

  setFlats([...flats,newFlat])

  setShowModal(false)

  setForm({
   flat:"",
   owner:"",
   email:"",
   phone:"",
   type:""
  })
 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Flats Management
   </h1>

   {/* Search + Add */}
   <div className="flex justify-between mb-4">

    <input
     type="text"
     placeholder="Search owner..."
     className="border p-2 rounded"
     value={search}
     onChange={(e)=>setSearch(e.target.value)}
    />

    <button
     onClick={()=>setShowModal(true)}
     className="bg-blue-500 text-white px-4 py-2 rounded"
    >
     Add Flat
    </button>

   </div>

   {/* Table */}

   <table className="w-full bg-white shadow rounded">

    <thead className="bg-gray-200">
     <tr>
      <th className="p-3">Flat</th>
      <th className="p-3">Owner</th>
      <th className="p-3">Email</th>
      <th className="p-3">Phone</th>
      <th className="p-3">Type</th>
      <th className="p-3">Actions</th>
     </tr>
    </thead>

    <tbody>

     {filteredFlats.map(f=>(
      <tr key={f.id} className="border-t">

       <td className="p-3">{f.flat}</td>
       <td className="p-3">{f.owner}</td>
       <td className="p-3">{f.email}</td>
       <td className="p-3">{f.phone}</td>
       <td className="p-3">{f.type}</td>

       <td className="p-3 space-x-2">

        <button className="bg-yellow-500 text-white px-3 py-1 rounded">
         Edit
        </button>

        <button
         onClick={()=>deleteFlat(f.id)}
         className="bg-red-500 text-white px-3 py-1 rounded"
        >
         Delete
        </button>

       </td>

      </tr>
     ))}

    </tbody>

   </table>

   {/* Modal */}

   {showModal && (

    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

     <div className="bg-white p-6 rounded w-96">

      <h2 className="text-xl font-bold mb-4">
       Add Flat
      </h2>

      <form onSubmit={handleSubmit}>

       <input
        placeholder="Flat Number"
        className="border p-2 w-full mb-3"
        value={form.flat}
        onChange={(e)=>setForm({...form,flat:e.target.value})}
       />

       <input
        placeholder="Owner Name"
        className="border p-2 w-full mb-3"
        value={form.owner}
        onChange={(e)=>setForm({...form,owner:e.target.value})}
       />

       <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        value={form.email}
        onChange={(e)=>setForm({...form,email:e.target.value})}
       />

       <input
        placeholder="Phone"
        className="border p-2 w-full mb-3"
        value={form.phone}
        onChange={(e)=>setForm({...form,phone:e.target.value})}
       />

       <input
        placeholder="Flat Type (2BHK)"
        className="border p-2 w-full mb-4"
        value={form.type}
        onChange={(e)=>setForm({...form,type:e.target.value})}
       />

       <div className="flex justify-end gap-3">

        <button
         type="button"
         onClick={()=>setShowModal(false)}
         className="bg-gray-400 text-white px-4 py-2 rounded"
        >
         Cancel
        </button>

        <button
         type="submit"
         className="bg-green-500 text-white px-4 py-2 rounded"
        >
         Save
        </button>

       </div>

      </form>

     </div>

    </div>

   )}

  </div>

 )
}