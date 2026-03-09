"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UserAuth() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      const savedEmail = localStorage.getItem("userEmail")
      const savedPassword = localStorage.getItem("userPassword")
      if (email === savedEmail && password === savedPassword) {
        router.push("/dashboard")
      } else {
        alert("Invalid credentials")
      }
    } else {
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userPassword", password)
      alert("Registration successful")
      setIsLogin(true)
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
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <p
          className="text-center mt-6 text-sm text-teal-600 hover:text-teal-700 cursor-pointer font-medium"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  )
}
