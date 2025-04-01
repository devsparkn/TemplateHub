'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner" 

const supabase = createClient()

export default function ConfirmEmailPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmUser = async () => {
      setLoading(true)
  
      let session = null // Declare session in the outer scope
  
      try {
        // Get the session after email confirmation
        const { data, error } = await supabase.auth.getSession()
  
        if (error) throw error
  
        session = data.session // Assign session to outer variable
  
        if (session?.user) {
          const { user } = session
          const name = user.user_metadata.name || ''
  
          // Check if user already exists in public.users table
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .maybeSingle()
  
          if (fetchError && fetchError.code !== 'PGRST116') throw fetchError
  
          if (existingUser) {
            throw new Error('User already exists in database')
          }
  
          // Insert new user into public.users table
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              name,
              email: user.email,
              created_at: new Date().toISOString()
            })
  
          if (insertError) throw insertError
  
          // Clear stored email from localStorage
          localStorage.removeItem('signup_email')
  
          toast("Account Verified!",{
            description: "You're now being redirected...",
          })
          router.push("/dashboard")
        } else {
          throw new Error("No active session found")
        }
      } catch (error) {
        let description = "Something went wrong. Try logging in manually."
        let redirectPath = "/auth/login"
        const email = session?.user?.email || searchParams.get('email') || ''
  
        if (error instanceof Error) {
          if (error.message.includes('already exists')) {
            description = "Account already verified. Please log in."
          } else if (error.message.includes('expired')) {
            description = "Confirmation link expired. Please request a new one."
            redirectPath = `/auth/check-email?email=${encodeURIComponent(email)}`
          } else if (error.message.includes('Invalid token')) {
            description = "Invalid confirmation link. Please request a new one."
            redirectPath = `/auth/check-email?email=${encodeURIComponent(email)}`
          }
        }
  
        toast("Verification Failed",{
          description,
        })
        router.push(redirectPath)
      } finally {
        setLoading(false)
      }
    }
  
    confirmUser()
  }, [router, searchParams])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {loading ? "Verifying your email..." : "Redirecting..."}
        </h1>
        <p className="text-muted-foreground">
          {loading ? "Please wait while we confirm your account" : "You'll be redirected shortly"}
        </p>
      </div>
    </div>
  )
}