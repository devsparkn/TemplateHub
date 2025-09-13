'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn: authSignIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      await authSignIn(email, password)
      toast.success('Logged in successfully!')
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Invalid email or password. Please try again.')
        toast.error(error.message || 'Invalid email or password. Please try again.')
      } else {
        setError('Invalid email or password. Please try again.')
        toast.error('Invalid email or password. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-background p-8 shadow-lg">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            type="button"
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-2"
          >
            <IoLogoGithub className="h-4 w-4" />
            GitHub
          </Button>
          <Button 
            variant="outline"
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-2"
          >
            <FcGoogle className="h-4 w-4" />
            Google
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
