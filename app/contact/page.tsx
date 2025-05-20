"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    alert("Thank you for your message. We'll get back to you soon!")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif font-bold mb-6 text-black">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Email</h3>
                  <p className="text-gray-600">info@bkessentia.com</p>
                  <p className="text-gray-600">support@bkessentia.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-black" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Phone</h3>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                  <p className="text-gray-600">+1 (123) 456-7891</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-black" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Address</h3>
                  <p className="text-gray-600">123 Fragrance Avenue</p>
                  <p className="text-gray-600">Perfume City, PC 12345</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6 text-black">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] bg-gray-200 mt-16">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
          {/* In a real application, you would embed a Google Map or similar here */}
        </div>
      </div>
    </div>
  )
}
