/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

import { Cloud, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({ name, email, message })
    toast("Message Sent!",{
      description: "We'll get back to you as soon as possible.",
  })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-500">Have questions about CloudCostAI? We are here to help!</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          <div className="bg-blue-600 shadow-lg rounded-lg overflow-hidden text-white">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>support@cloudcostai.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>123 AI Street, Cloud City, CC 12345</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Follow us</h4>
                <div className="flex space-x-4">{/* Add your social media icons/links here */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

