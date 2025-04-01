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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

// Error handle in typescript
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    return String(error) // Convert non-standard errors to a string
  }

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
        
        toast("Success",{
          description: "Welcome back!",
        })
        router.push("/dashboard")
      } catch (error) {
        toast("Error",{
          description: getErrorMessage(error) || "Login failed",
        })
      } finally {
        setLoading(false)
      }
    },
    [email, password, router]
  )

  const handleGoogleLogin = useCallback(async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/dashboard` // Redirect to dashboard instead
        }
      })

      if (error) throw error
    } catch (error) {
      toast("Error",{
        description: getErrorMessage(error) || "Google login failed",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
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
          <span className="text-muted-foreground">Don&#36;t have an account? </span>
          <Button
            variant="link"
            className="p-0 text-blue-500"
            onClick={() => router.push("/auth/signup")}
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  )
}