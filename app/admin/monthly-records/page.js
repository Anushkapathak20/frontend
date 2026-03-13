"use client"

import { useState, useMemo, useEffect } from "react"

const ALL_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

const MONTH_INDEX = {
  January:1, February:2, March:3, April:4, May:5, June:6,
  July:7, August:8, September:9, October:10, November:11, December:12
}

function toYYYYMM(monthName){
  if(!monthName) return null
  const year = new Date().getFullYear()
  const m = MONTH_INDEX[monthName]
  return m ? `${year}-${String(m).padStart(2,"0")}` : null
}

export default function MonthlyRecords(){

  const [records,setRecords] = useState([])
  const [selectedMonth,setSelectedMonth] = useState(
    new Date().toLocaleString("default",{month:"long"})
  )
  const [showPending,setShowPending] = useState(false)

  // FETCH FROM BACKEND
  useEffect(()=>{

    const params = new URLSearchParams()
    const m = toYYYYMM(selectedMonth)

    if(m) params.set("month",m)

    const url = `http://localhost:5000/api/monthly-records${params.toString() ? "?"+params : ""}`

    fetch(url)
      .then(res=>res.json())
      .then(data=>{
        if(data.success){
          setRecords(data.data || [])
        }
      })
      .catch(err=>console.error(err))

  },[selectedMonth])



  const markPaid = async(record)=>{

    try{

      const m = toYYYYMM(selectedMonth)

      const isSynthetic = record.record_id == null

      const res = isSynthetic

      ? await fetch("http://localhost:5000/api/monthly-records/pay-flat",{
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body:JSON.stringify({
            flat_number:record.flat_number,
            month:m
          })
        })

      : await fetch(
          `http://localhost:5000/api/monthly-records/${record.record_id}/pay`,
          {
            method:"PATCH",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({
              payment_mode:"Cash"
            })
          }
        )

      if(!res.ok){
        const errData = await res.json().catch(()=>({}))
        throw new Error(errData.error || "Failed to update payment")
      }

      setRecords(prev =>
        prev.map(r =>
          (isSynthetic
            ? r.flat_number === record.flat_number
            : r.record_id === record.record_id)
            ? { ...r, status:"Paid" }
            : r
        )
      )

    }catch(err){
      console.error(err)
    }
  }



  const monthRecords = useMemo(()=>{
    return records
  },[records])


  const filteredRecords = showPending
    ? monthRecords.filter(r=>r.status==="Pending")
    : monthRecords


  const pendingRecords = monthRecords.filter(r=>r.status==="Pending")

  const totalPending = pendingRecords.reduce(
    (sum,r)=> sum + (Number(r.amount_due)||0),0
  )

  const paidCount = monthRecords.filter(r=>r.status==="Paid").length

  const pendingCount = new Set(
    pendingRecords.map(r=>r.flat_number)
  ).size



  return(

    <div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Monthly Subscription Records
          </h1>

          <p className="text-slate-500 mt-1">
            Shows each flat&apos;s payment status and lets you mark subscriptions as paid.
          </p>
        </div>


        <div className="flex flex-col items-start gap-2">

          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Month
          </label>

          <select
            value={selectedMonth}
            onChange={(e)=>setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-[160px]"
          >

            {ALL_MONTHS.map((m)=>(
              <option key={m} value={m}>
                {m}
              </option>
            ))}

          </select>

        </div>

      </div>



      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">

        <div className="p-6 rounded-xl bg-emerald-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Paid Flats</p>
          <p className="text-2xl font-bold mt-1">{paidCount}</p>
        </div>

        <div className="p-6 rounded-xl bg-rose-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Pending Flats</p>
          <p className="text-2xl font-bold mt-1">{pendingCount}</p>
        </div>

        <div className="p-6 rounded-xl bg-teal-600 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90">Pending Amount</p>
          <p className="text-2xl font-bold mt-1">₹{totalPending}</p>
        </div>

      </div>



      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            checked={showPending}
            onChange={()=>setShowPending(!showPending)}
            className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />

          <span className="text-sm font-medium text-slate-700">
            Show only pending payments
          </span>

        </label>


        {selectedMonth && (
          <span className="text-xs text-slate-500">
            Showing {filteredRecords.length} records for {selectedMonth}
          </span>
        )}

      </div>



      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Resident
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Amount Due
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Status
                </th>

                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredRecords.length===0 ? (

                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-6 text-center text-sm text-slate-500"
                  >
                    No records for {selectedMonth}.
                  </td>
                </tr>

              ) : (

                filteredRecords.map((record)=>(
                  
                  <tr
                    key={record.record_id ?? `synthetic-${record.flat_number}-${record.billing_month}`}
                    className="hover:bg-slate-50/50 transition-colors"
                  >

                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {record.flat_number}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {record.full_name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      ₹{record.amount_due}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full
                        ${
                          record.status==="Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {record.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-right">

                      {record.status==="Pending" && (

                        <button
                          onClick={()=>markPaid(record)}
                          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Mark as Paid
                        </button>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}