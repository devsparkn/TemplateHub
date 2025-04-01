/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  image?: string
} | null

type AuthContextType = {
  user: User
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    // This would be replaced with actual authentication logic
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      setUser({
        id: '1',
        name: 'Demo User',
        email: email,
        image: '/avatars/user.png'
      })
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Mock sign out function
  const signOut = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if user is already logged in
  useEffect(() => {
    // In a real implementation, this would check cookies, localStorage, or a token
    const checkAuth = async () => {
      try {
        // Simulate API call to validate session
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // For demo, we'll just set the user to null
        setUser(null)
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

