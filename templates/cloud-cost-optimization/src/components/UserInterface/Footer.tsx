import React from 'react'
import Link from 'next/link'
import { Cloud } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Logo + Title */}
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-400 mr-2" />
            <span className="text-xl font-bold">CloudCostAI</span>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 items-center space-y-2 sm:space-y-0">
            <Link href="/privacy" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm">
          © {new Date().getFullYear()} CloudCostAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
