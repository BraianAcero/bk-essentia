"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-black">
            BK ESSENTIA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/collections/men" className="text-gray-800 hover:text-black transition-colors">
              Men
            </Link>
            <Link href="/collections/women" className="text-gray-800 hover:text-black transition-colors">
              Women
            </Link>
            <Link href="/collections/arabian" className="text-gray-800 hover:text-black transition-colors">
              Arabian
            </Link>
            <Link href="/collections/unisex" className="text-gray-800 hover:text-black transition-colors">
              Unisex
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-black transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-black transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5 text-gray-800" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-800" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/collections/men"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/collections/women"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/collections/arabian"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Arabian
            </Link>
            <Link
              href="/collections/unisex"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Unisex
            </Link>
            <Link
              href="/about"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-800 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-2 border-t">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5 text-gray-800" />
              </Button>
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-800" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
