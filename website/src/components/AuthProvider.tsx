/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { SessionProvider, signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react'

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Client AuthProvider that uses NextAuth session
function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const isAdmin = session?.user?.role === 'admin'

  const signIn = async (email: string, password: string) => {
    const result = await nextAuthSignIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      throw new Error(result.error)
    }
  }

  const signOut = async () => {
    await nextAuthSignOut({ redirect: false })
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, loading, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

// Main AuthProvider that wraps the app with SessionProvider and our custom AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

