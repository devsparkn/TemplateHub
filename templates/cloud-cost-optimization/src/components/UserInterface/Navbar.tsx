'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Cloud } from "lucide-react"

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow-sm border-b-2 border-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-500 mr-2" />
            <span className="text-xl font-bold text-gray-800">CloudCostAI</span>
          </div>
          
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth/login" 
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Login <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
