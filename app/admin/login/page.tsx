'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0E] px-4">
      <div className="w-full max-w-md bg-tfs-panel border border-white/5 p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-tfs-red rounded flex items-center justify-center font-black text-xl tracking-tighter text-white mb-4">
            TFS
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider uppercase">Admin Portal</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-tfs-red/10 border border-tfs-red/30 rounded text-tfs-red text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-tfs-muted mb-2 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-tfs-dark border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-tfs-red transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-tfs-muted mb-2 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-tfs-dark border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-tfs-red transition-colors"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-tfs-red hover:bg-tfs-redSecondary text-white font-bold uppercase tracking-wider py-4 rounded transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  )
}
