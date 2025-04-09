'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Cloud, Menu, X } from "lucide-react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Cloud className="h-8 w-8 text-blue-500 mr-2" />
          <span className="text-xl font-bold text-gray-800">CloudCostAI</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {['Home', 'Dashboard', 'Pricing', 'Contact'].map((text) => (
            <Link 
              key={text} 
              href={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`} 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {text}
            </Link>
          ))}
          <Link 
            href="/auth/login" 
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {['Home', 'Dashboard', 'Pricing', 'Contact'].map((text) => (
            <Link 
              key={text} 
              href={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`} 
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              {text}
            </Link>
          ))}
          <Link 
            href="/auth/login" 
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            onClick={() => setMenuOpen(false)}
          >
            Login <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
