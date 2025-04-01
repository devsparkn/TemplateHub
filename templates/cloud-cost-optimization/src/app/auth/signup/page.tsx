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
import { createClient } from "@/lib/supabase/client"


// ✅ Define Supabase client outside component to avoid re-creating it on every render
const supabase = createClient()

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  // Error handle in typescript
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    return String(error) // Convert non-standard errors to a string
  }

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        toast("Error",{
          description: "Passwords do not match!",
        })
        return
      }
  
      setLoading(true)
  
      try {
        // First check if user exists in public.users table
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('email')
          .eq('email', email)
          .maybeSingle()
  
        if (fetchError) throw fetchError
        
        if (existingUser) {
          throw new Error('User with this email already exists')
        }
  
        // Proceed with signup if user doesn't exist
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
            emailRedirectTo: `${location.origin}/auth/confirm`
          }
        })
  
        if (error) throw error
  
        // Store email for potential resend
        localStorage.setItem('signup_email', email)
        
        toast("Success",{
          description: "Check your email for confirmation!",
        })
        router.push("/auth/check-email")
      } catch (error) {
        let description = "Signup failed"
        
        if (error instanceof Error) {
          if (error.message.includes('already exists')) {
            description = "User with this email already exists. Please login"
          } else if (error.message.includes('already registered')) {
            description = "Account already exists - check your email for confirmation"
          }
        }
  
        toast("Error",{
          description,
        })
      } finally {
        setLoading(false)
      }
    },
    [name, email, password, confirmPassword, router,]
  )

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}` // Redirect to home page
        }
      })

      if (error) throw error
    } catch (error) {
      toast("Error",{
        description:  getErrorMessage(error) || "Google login failed",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Start your journey with us
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

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
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button
            variant="link"
            className="p-0 text-blue-500"
            onClick={() => router.push("/auth/login")}
          >
            Log in
          </Button>
        </div>
      </Card>
    </div>
  )
}