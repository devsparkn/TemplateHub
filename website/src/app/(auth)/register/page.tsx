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
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

export default function Page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      toast.error('Passwords do not match')
      return
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions')
      toast.error('You must accept the terms and conditions')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Create account via API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error creating account');
      }
      
      // Sign in after account creation
      await signIn(email, password);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Failed to create account. Please try again.');
      } else {
        setError('Failed to create account. Please try again.');
      }
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-background p-8 shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{ error }</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I accept the <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                </Label>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              <IoLogoGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button">
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}