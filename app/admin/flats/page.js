"use client"

import { useState } from "react"
import flatsData from "@/data/flats.json"
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa"

export default function Flats() {
  const [flats, setFlats] = useState(flatsData)
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    flat: "",
    owner: "",
    email: "",
    phone: "",
    type: "",
  })

  const filteredFlats = flats.filter((f) =>
    f.owner.toLowerCase().includes(search.toLowerCase())
  )

  const deleteFlat = (id) => {
    setFlats(flats.filter((f) => f.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newFlat = { id: Date.now(), ...form }
    setFlats([...flats, newFlat])
    setShowModal(false)
    setForm({ flat: "", owner: "", email: "", phone: "", type: "" })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Flats Management</h1>
        <p className="text-slate-500 mt-1">View and manage all society flats</p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by owner name..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" />
          Add Flat
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Owner
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Email
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Phone
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Type
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFlats.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {f.flat}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{f.owner}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{f.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{f.phone}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                      {f.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <FaEdit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteFlat(f.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Add New Flat
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Flat Number"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={form.flat}
                onChange={(e) => setForm({ ...form, flat: e.target.value })}
              />
              <input
                placeholder="Owner Name"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Phone"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Flat Type (e.g. 2BHK)"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Save Flat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}