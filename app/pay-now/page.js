"use client"

import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import UserLayout from "../layout-user"

export default function PayNow() {

  const [payment, setPayment] = useState(null)
  const [payment_mode, setPayment_mode] = useState("UPI")
  const [transaction_id, setTransaction_id] = useState("")
  const [paid, setPaid] = useState(false)

  useEffect(() => {

    const storedUser = localStorage.getItem("residentUser")

    if (!storedUser) return

    const user = JSON.parse(storedUser)

    fetch(`http://localhost:5000/api/resident/pending-payment?email=${user.email}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setPayment(res.data)
          console.log("Pending payment data:", res.data)
        }

      })
      .catch(err => console.error(err))

  }, [])


  const handlePayment = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/payments", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          flat_number: payment.flat_number,
          billing_month: payment.billing_month,
          amount: payment.amount,
          payment_mode

        })

      })

      const data = await res.json()

      if (data.success) {

        setTransaction_id(data.data.transaction_id)

        setPaid(true)

      }

    } catch (err) {

      console.error(err)

    }

  }


  const downloadReceipt = () => {

    const doc = new jsPDF()

    doc.setFontSize(18)

    doc.text("Society Payment Receipt", 14, 20)

    const tableData = [

      ["Flat", payment.flat_number],
      ["Billing Month", payment.billing_month],
      ["Amount Paid", `₹${payment.amount}`],
      ["Payment Mode", payment_mode],
      ["Transaction ID", transaction_id],
      ["Date", new Date().toLocaleDateString()],

    ]

    autoTable(doc, {

      startY: 30,
      head: [["Field", "Details"]],
      body: tableData,
      theme: "grid",

    })

    doc.save("receipt.pdf")

  }


  if (!payment) {

    return (
      <UserLayout>
        <p>No pending payments found.</p>
      </UserLayout>
    )

  }

  return (

    <UserLayout>

      <div className="flex justify-center py-8">

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border">

          <h1 className="text-xl font-semibold mb-6">
            Subscription Payment
          </h1>

          {!paid ? (

            <>

              <p><b>Flat:</b> {payment.flat_number}</p>

              <p><b>Billing Month:</b> {payment.billing_month}</p>

              <p><b>Amount Due:</b> ₹{payment.amount}</p>


              <select

                value={payment_mode}

                onChange={(e) => setPayment_mode(e.target.value)}

                className="w-full mt-4 border p-2"

              >

                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>

              </select>


              <button

                onClick={handlePayment}

                className="w-full mt-6 py-3 bg-teal-600 text-white rounded-lg"

              >

                Pay Now

              </button>

            </>

          ) : (

            <>

              <h2 className="text-emerald-600 font-semibold mb-4">
                Payment Successful
              </h2>

              <p><b>Transaction ID:</b> {transaction_id}</p>

              <p><b>Amount:</b> ₹{payment.amount}</p>

              <p><b>Payment Mode:</b> {payment_mode}</p>


              <button

                onClick={downloadReceipt}

                className="w-full mt-6 py-3 bg-teal-600 text-white rounded-lg"

              >

                Download Receipt

              </button>

            </>

          )}

        </div>

      </div>

    </UserLayout>

  )

}




// "use client"

// import { useState } from "react"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"
// import data from "@/data/paymentDetails.json"
// import UserLayout from "../layout-user"

// export default function PayNow() {
//   const [paid, setPaid] = useState(false)
//   const [payment_mode, setPayment_mode] = useState("UPI")
//   const [transaction_id, setTransaction_id] = useState("")

//   const handlePayment = () => {
//     const id = "TXN" + Math.floor(Math.random() * 1000000)
//     setTransaction_id(id)
//     setPaid(true)
//   }

//   const downloadReceipt = () => {
//     const doc = new jsPDF()
//     doc.setFontSize(18)
//     doc.text("Society Payment Receipt", 14, 20)
//     const tableData = [
//       ["Flat", data.flat_number],
//       ["Billing Month", data.billing_month],
//       ["Amount Due", `Rs. ${data.amount_due}`],
//       ["Payment Mode", payment_mode],
//       ["Transaction ID", transaction_id],
//       ["Date", new Date().toLocaleDateString()],
//     ]
//     autoTable(doc, {
//       startY: 30,
//       head: [["Field", "Details"]],
//       body: tableData,
//       theme: "grid",
//     })
//     doc.save("receipt.pdf")
//   }

//   return (
//     <UserLayout>
//       <div className="flex justify-center py-8">
//         <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
//           <h1 className="text-xl font-semibold text-slate-900 mb-6">
//             Subscription Payment
//           </h1>

//           {!paid ? (
//             <>
//               <div className="space-y-3 mb-6">
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">Flat:</span>{" "}
//                   {data.flat_number}
//                 </p>
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">
//                     Billing Month:
//                   </span>{" "}
//                   {data.billing_month}
//                 </p>
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">Amount Due:</span>{" "}
//                   ₹{data.amount_due}
//                 </p>
//               </div>

//               <select
//                 value={payment_mode}
//                 onChange={(e) => setPayment_mode(e.target.value)}
//                 className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-6"
//               >
//                 <option>UPI</option>
//                 <option>Card</option>
//                 <option>Net Banking</option>
//               </select>

//               <button
//                 onClick={handlePayment}
//                 className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
//               >
//                 Pay Now
//               </button>
//             </>
//           ) : (
//             <div>
//               <h2 className="text-emerald-600 font-semibold mb-4">
//                 Payment Successful
//               </h2>
//               <div className="space-y-2 mb-6">
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">
//                     Transaction ID:
//                   </span>{" "}
//                   {transaction_id}
//                 </p>
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">Amount:</span> Rs.{" "}
//                   {data.amount_due}
//                 </p>
//                 <p className="text-slate-600">
//                   <span className="font-medium text-slate-900">
//                     Payment Mode:
//                   </span>{" "}
//                   {payment_mode}
//                 </p>
//               </div>
//               <button
//                 onClick={downloadReceipt}
//                 className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
//               >
//                 Download Receipt
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </UserLayout>
//   )
// }
