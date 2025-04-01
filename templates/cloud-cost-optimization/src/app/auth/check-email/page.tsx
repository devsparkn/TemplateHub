'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const supabase = createClient()

export default function CheckEmailPage() {
  const [email, setEmail] = useState("")
  const [manualEmail, setManualEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get email from URL query params or localStorage
    const queryEmail = searchParams.get("email")
    const storedEmail = localStorage.getItem('signup_email')
    
    if (queryEmail) {
      setEmail(queryEmail)
      localStorage.setItem('signup_email', queryEmail)
    } else if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [searchParams])

  const handleResendConfirmation = async () => {
    setLoading(true)
    try {
      const emailToSend = email || manualEmail
      if (!emailToSend) throw new Error("No email provided")

      // Check if user exists in auth system
      const { data: { user }, error: fetchError } = await supabase.auth.getUser()
      
      if (fetchError?.message.includes("Invalid login credentials")) {
        // User exists but not confirmed
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: emailToSend,
        })

        if (error) throw error
      } else if (fetchError) {
        throw fetchError
      }

      toast({
        title: "Confirmation Email Resent",
        description: "Check your email again for the new confirmation link",
      })
    } catch (error) {
      let description = "Failed to resend confirmation"
      
      if (error instanceof Error) {
        if (error.message.includes("already confirmed")) {
          description = "Email already verified. Please log in."
          router.push("/auth/login")
        } else if (error.message.includes("rate limited")) {
          description = "Please wait before requesting another email"
        } else if (error.message.includes("No email provided")) {
          description = "Please enter your email address"
        }
      }

      toast({
        variant: "destructive",
        title: "Error",
        description,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Check your email</h1>
        
        {email ? (
          <p className="text-muted-foreground">
            We've sent a confirmation link to <span className="font-semibold">{email}</span>
          </p>
        ) : (
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Please enter the email you used to sign up
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Button 
            onClick={handleResendConfirmation}
            disabled={loading}
          >
            {loading ? "Sending..." : "Resend Confirmation"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check spam folder or try resending
          </p>
        </div>

        <Button 
          variant="link" 
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </Button>
      </div>
    </div>
  )
}