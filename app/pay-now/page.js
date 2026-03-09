"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import data from "@/data/paymentDetails.json"
import UserLayout from "../layout-user"
export default function PayNow(){

 const [paid,setPaid] = useState(false)
 const [method,setMethod] = useState("UPI")
 const [transactionId,setTransactionId] = useState("")

 const handlePayment=()=>{

  const id = "TXN" + Math.floor(Math.random()*1000000)

  setTransactionId(id)
  setPaid(true)

 }

 const downloadReceipt=()=>{

  const doc = new jsPDF()

  doc.text("Society Payment Receipt",20,20)

  doc.text(`Flat: ${data.flat}`,20,40)
  doc.text(`Month: ${data.month}`,20,50)
  doc.text(`Amount: ₹${data.amount}`,20,60)
  doc.text(`Payment Method: ${method}`,20,70)
  doc.text(`Transaction ID: ${transactionId}`,20,80)
  doc.text(`Date: ${new Date().toLocaleDateString()}`,20,90)

  doc.save("receipt.pdf")

 }

 return(
<UserLayout>
  <div className="p-6 bg-gray-100 min-h-screen flex justify-center">

   <div className="bg-white p-6 rounded shadow w-96">

    <h1 className="text-xl font-bold mb-4">
     Subscription Payment
    </h1>

    {!paid ? (

     <>
      <p><b>Flat:</b> {data.flat}</p>
      <p><b>Month:</b> {data.month}</p>
      <p><b>Amount:</b> ₹{data.amount}</p>

      {/* Payment Method */}

      <select
       value={method}
       onChange={(e)=>setMethod(e.target.value)}
       className="border p-2 rounded w-full mt-4"
      >
       <option>UPI</option>
       <option>Card</option>
       <option>Net Banking</option>
      </select>

      <button
       onClick={handlePayment}
       className="bg-green-600 text-white w-full py-2 mt-6 rounded"
      >
       Pay Now
      </button>

     </>

    ) : (

     <div>

      <h2 className="text-green-600 font-bold mb-4">
       Payment Successful
      </h2>

      <p><b>Transaction ID:</b> {transactionId}</p>
      <p><b>Amount:</b> ₹{data.amount}</p>
      <p><b>Method:</b> {method}</p>

      <button
       onClick={downloadReceipt}
       className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
       Download Receipt
      </button>

     </div>

    )}

   </div>

  </div>
</UserLayout>
 )
}