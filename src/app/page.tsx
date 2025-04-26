'use client'

import { useState } from 'react'
import { signInWithEmail } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    const { error } = await signInWithEmail(email, password)
    if (error) {
      setError(error.message)
    } else {
      // Redirect or show success
      window.location.href = '/'
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        className="border p-2 mb-4 block w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-4 block w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Log In
      </button>
    </div>
  )
}