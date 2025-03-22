"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "kevin.jhonson" && password === "12345") {
      localStorage.setItem("loggedIn", "true")
      router.push("/dashboard") 
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {/* 🖼️ Imagen en la parte superior */}
        <div className="flex justify-center mb-4">
          <Image src="/images/inclusivai.png" alt="Login Banner" width={200} height={100} />
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
