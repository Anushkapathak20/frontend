"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function AdminAuth(){

 const router = useRouter()

 const [isLogin,setIsLogin] = useState(true)

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleSubmit=(e)=>{
  e.preventDefault()

  if(isLogin){

   const savedEmail = localStorage.getItem("adminEmail")
   const savedPassword = localStorage.getItem("adminPassword")

   if(email===savedEmail && password===savedPassword){
     router.push("/admin/dashboard")
   }else{
     alert("Invalid credentials")
   }

  }else{

   localStorage.setItem("adminEmail",email)
   localStorage.setItem("adminPassword",password)

   alert("Registration successful")

   setIsLogin(true)

  }
 }

 return(

  <div className="flex items-center justify-center min-h-screen bg-gray-100">

   <div className="bg-white p-8 rounded shadow w-96">

    <h2 className="text-2xl font-bold text-center mb-6">
      {isLogin ? "Admin Login" : "Admin Register"}
    </h2>

    <form onSubmit={handleSubmit}>

     <input
      type="email"
      placeholder="Email"
      className="w-full p-3 border mb-4 rounded"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     />

     <input
      type="password"
      placeholder="Password"
      className="w-full p-3 border mb-4 rounded"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
     />

     <button className="w-full bg-blue-600 text-white p-3 rounded mb-4">

      {isLogin ? "Login" : "Register"}

     </button>

    </form>

    <div className="text-center mb-4">
      -------- OR --------
    </div>

    <button
      onClick={()=>signIn("google")}
      className="w-full bg-red-500 text-white p-3 rounded"
    >
      Continue with Google
    </button>

    <p
     className="text-center mt-4 text-blue-600 cursor-pointer"
     onClick={()=>setIsLogin(!isLogin)}
    >

     {isLogin
      ? "New Admin? Register here"
      : "Already have account? Login"}

    </p>

   </div>

  </div>

 )
}