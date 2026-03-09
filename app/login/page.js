"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UserAuth(){

 const router = useRouter()

 const [isLogin,setIsLogin] = useState(true)

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleSubmit=(e)=>{
  e.preventDefault()

  if(isLogin){

   const savedEmail = localStorage.getItem("userEmail")
   const savedPassword = localStorage.getItem("userPassword")

   if(email === savedEmail && password === savedPassword){
     router.push("/dashboard")
   }else{
     alert("Invalid credentials")
   }

  }else{

   localStorage.setItem("userEmail",email)
   localStorage.setItem("userPassword",password)

   alert("Registration successful")

   setIsLogin(true)

  }

 }

 return(

  <div className="flex items-center justify-center min-h-screen bg-gray-100">

   <div className="bg-white p-8 rounded shadow w-96">

    <h2 className="text-2xl font-bold text-center mb-6">

     {isLogin ? "Resident Login" : "Resident Register"}

    </h2>

    <form onSubmit={handleSubmit}>

     <input
      type="email"
      placeholder="Email"
      className="w-full border p-3 mb-4 rounded"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     />

     <input
      type="password"
      placeholder="Password"
      className="w-full border p-3 mb-4 rounded"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
     />

     <button className="w-full bg-blue-600 text-white p-3 rounded">

      {isLogin ? "Login" : "Register"}

     </button>

    </form>

    <p
     className="text-center mt-4 text-blue-600 cursor-pointer"
     onClick={()=>setIsLogin(!isLogin)}
    >

     {isLogin
      ? "New user? Register here"
      : "Already have account? Login"}

    </p>

   </div>

  </div>

 )
}