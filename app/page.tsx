"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">BK ESSENTIA</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-8">
            Discover our exquisite collection of fine fragrances crafted to elevate your essence
          </p>
          <Link
            href="#categories"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-black">Our Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Men's Collection */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Men's Collection</h3>
              <p className="text-gray-200 mb-4">Bold and sophisticated fragrances for the modern man</p>
              <Link
                href="/collections/men"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                View Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Women's Collection */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Women's Collection</h3>
              <p className="text-gray-200 mb-4">Elegant and captivating scents for the modern woman</p>
              <Link
                href="/collections/women"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                View Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Arabian Collection */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Arabian Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Arabian Collection</h3>
              <p className="text-gray-200 mb-4">Rich and exotic fragrances inspired by Arabian traditions</p>
              <Link
                href="/collections/arabian"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                View Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Unisex Collection */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Unisex Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Unisex Collection</h3>
              <p className="text-gray-200 mb-4">Versatile fragrances designed for everyone</p>
              <Link
                href="/collections/unisex"
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
              >
                View Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6 text-black">About BK ESSENTIA</h2>
            <p className="text-lg text-gray-700 mb-4">
              BK ESSENTIA is dedicated to crafting exceptional fragrances that capture the essence of luxury and
              sophistication. Our carefully curated collections offer a diverse range of scents for every preference and
              occasion.
            </p>
            <p className="text-lg text-gray-700">
              Each perfume is meticulously created using the finest ingredients, ensuring a lasting impression wherever
              you go.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
