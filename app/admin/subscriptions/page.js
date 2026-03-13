"use client"

import { useState, useEffect } from "react"

export default function Subscriptions() {

  const [plans, setPlans] = useState([])

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

  // FETCH PLANS
  const fetchPlans = async () => {

    try{

      const res = await fetch(`${BACKEND}/api/subscriptions`)
      const data = await res.json()

      // console.log(data)

      if(data.success){

        const formatted = data.data.map((plan)=>({
          plan_id: plan.id,
          flat_type: plan.flat_type,
          monthly_rate: plan.monthly_amount
        }))

        setPlans(formatted)

      }

    }catch(err){

      console.error("Error fetching plans",err)

    }

  }

  useEffect(()=>{
    fetchPlans()
  },[])


  const handleChange = (plan_id, value) => {

    const updated = plans.map((plan) =>
      plan.plan_id === plan_id
        ? { ...plan, monthly_rate: Number(value) }
        : plan
    )

    setPlans(updated)

  }


  const handleUpdate = async (plan) => {

    try{

      const res = await fetch(
        `${BACKEND}/api/subscriptions/${plan.plan_id}`,
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            flat_type: plan.flat_type,
            monthly_amount: plan.monthly_rate
          })
        }
      )

      const data = await res.json()

      if(data.success){

        alert(
          `${plan.flat_type} subscription updated to ₹${plan.monthly_rate}`
        )

        fetchPlans()

      }

    }catch(err){

      console.error(err)

    }

  }


  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Subscription Plans
        </h1>
        <p className="text-slate-500 mt-1">
          Manage flat-type monthly rates (subscription_plans)
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Flat Type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Monthly Rate (₹)
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {plans.map((plan) => (

                <tr
                  key={plan.plan_id}
                  className="hover:bg-slate-50/50 transition-colors"
                >

                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {plan.flat_type}
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={plan.monthly_rate}
                      onChange={(e) =>
                        handleChange(plan.plan_id, e.target.value)
                      }
                      className="w-32 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdate(plan)}
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Update
                    </button>
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