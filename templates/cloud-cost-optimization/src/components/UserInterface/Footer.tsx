import React from 'react'
import Link from 'next/link'
import { Cloud } from "lucide-react"
const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">CloudCostAI</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">© {new Date().getFullYear()} CloudCostAI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
