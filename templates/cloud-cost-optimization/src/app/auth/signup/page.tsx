/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!name || !email || !password || !confirmPassword) {
        toast("Error", { description: "Please fill all the required fields!" })
        return
      }
      if (password !== confirmPassword) {
        toast("Error", { description: "Passwords do not match!" })
        return
      }
      
      toast("Success", { description: "Sign-up Successful!" })
      router.push("/dashboard")
    },
    [name, email, password, confirmPassword, router]
  )

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true)
    try {
      // Implement Google login logic here
    } catch (error) {
      toast("Error", { description: "Google login failed" })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Start your journey with us</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="mt-2 text-center">
          <Button onClick={handleGoogleLogin} className="w-full" disabled={loading}>
            <FcGoogle className="mr-2 h-4 w-4" /> Continue with Google
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button variant="link" className="p-0 text-blue-500" onClick={() => router.push("/auth/login")}>
            Log in
          </Button>
        </div>
      </Card>
    </div>
  )
}