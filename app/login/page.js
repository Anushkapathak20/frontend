"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UserAuth() {

  const router = useRouter()

  const [isLogin,setIsLogin] = useState(true)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

  const handleSubmit = async (e)=>{
    e.preventDefault()

    // LOGIN
    if(isLogin){

      const res = await fetch(`${BACKEND}/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if(res.ok){

        // save token
        localStorage.setItem("token",data.token)
        localStorage.setItem("userRole",data.user.role)
        
        localStorage.setItem("residentUser", JSON.stringify(data.user))

        // ensure resident login
        if(data.user.role !== "resident"){
          alert("This portal is only for residents")
          return
        }

        router.push("/dashboard")

      }else{
        alert(data.message)
      }

    }

    // REGISTER
    else{

      const res = await fetch(`${BACKEND}/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password,
          name:name,
          phone:phone,
          role:"resident"
        })
      })

      const data = await res.json()

if(res.ok){

  alert(data.message)

  // redirect to login
  setIsLogin(true)

  setEmail("")
  setPassword("")
  setName("")
  setPhone("")

}else{
  alert(data.message)
}
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            {isLogin ? "Resident Login" : "Resident Register"}
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            {isLogin
              ? "Sign in to your resident portal"
              : "Create a resident account"}
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {!isLogin && (
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-slate-200 rounded-lg"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>

        </form>

        <p
          className="text-center mt-6 text-sm text-teal-600 cursor-pointer"
          onClick={()=>setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Sign in"}
        </p>

      </div>

    </div>
  )
}