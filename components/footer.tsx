import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">BK ESSENTIA</h3>
            <p className="mb-4">Elevate your essence with our exquisite collection of fine fragrances.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-bold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/men" className="text-white hover:text-gray-300 transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/women" className="text-white hover:text-gray-300 transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/arabian" className="text-white hover:text-gray-300 transition-colors">
                  Arabian Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/unisex" className="text-white hover:text-gray-300 transition-colors">
                  Unisex Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} BK ESSENTIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
