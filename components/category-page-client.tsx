"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

// Tipo para los productos
interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  notes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
  size?: string
  concentration?: string
}

// Datos iniciales de productos
const initialProducts = {
  men: [
    {
      id: "m1",
      name: "Midnight Essence",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "men",
    },
    { id: "m2", name: "Ocean Breeze", price: 79.99, image: "/placeholder.svg?height=400&width=300", category: "men" },
    { id: "m3", name: "Timber Noir", price: 99.99, image: "/placeholder.svg?height=400&width=300", category: "men" },
    { id: "m4", name: "Urban Legend", price: 85.99, image: "/placeholder.svg?height=400&width=300", category: "men" },
    { id: "m5", name: "Citrus Fusion", price: 69.99, image: "/placeholder.svg?height=400&width=300", category: "men" },
    { id: "m6", name: "Amber Woods", price: 95.99, image: "/placeholder.svg?height=400&width=300", category: "men" },
  ],
  women: [
    { id: "w1", name: "Rose Elixir", price: 89.99, image: "/placeholder.svg?height=400&width=300", category: "women" },
    {
      id: "w2",
      name: "Floral Symphony",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "women",
    },
    {
      id: "w3",
      name: "Velvet Orchid",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "women",
    },
    {
      id: "w4",
      name: "Jasmine Dreams",
      price: 85.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "women",
    },
    { id: "w5", name: "Peony Blush", price: 69.99, image: "/placeholder.svg?height=400&width=300", category: "women" },
    { id: "w6", name: "Vanilla Musk", price: 95.99, image: "/placeholder.svg?height=400&width=300", category: "women" },
  ],
  arabian: [
    {
      id: "a1",
      name: "Oud Royale",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
    {
      id: "a2",
      name: "Arabian Nights",
      price: 119.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
    {
      id: "a3",
      name: "Desert Rose",
      price: 139.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
    {
      id: "a4",
      name: "Amber Sands",
      price: 125.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
    {
      id: "a5",
      name: "Mystic Saffron",
      price: 109.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
    {
      id: "a6",
      name: "Golden Musk",
      price: 135.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "arabian",
    },
  ],
  unisex: [
    {
      id: "u1",
      name: "Citrus Harmony",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "unisex",
    },
    { id: "u2", name: "Ocean Mist", price: 89.99, image: "/placeholder.svg?height=400&width=300", category: "unisex" },
    {
      id: "u3",
      name: "Fresh Vetiver",
      price: 109.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "unisex",
    },
    {
      id: "u4",
      name: "Amber Elixir",
      price: 95.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "unisex",
    },
    {
      id: "u5",
      name: "Cedar & Sage",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "unisex",
    },
    {
      id: "u6",
      name: "Bergamot Bliss",
      price: 105.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "unisex",
    },
  ],
}

export default function CategoryPageClient({
  category,
  title,
  description,
}: {
  category: string
  title: string
  description: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState("featured")

  // Cargar productos del localStorage o usar los iniciales
  useEffect(() => {
    const storedProducts = localStorage.getItem("bk-products")

    if (storedProducts) {
      const allProducts: Product[] = JSON.parse(storedProducts)
      const filteredProducts = allProducts.filter((product) => product.category === category)

      if (filteredProducts.length > 0) {
        setProducts(filteredProducts)
      } else {
        setProducts(initialProducts[category as keyof typeof initialProducts])
      }
    } else {
      setProducts(initialProducts[category as keyof typeof initialProducts])
    }
  }, [category])

  // Ordenar productos
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value
    setSortOption(option)

    let sortedProducts = [...products]

    switch (option) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // En un caso real, esto ordenaría por fecha de creación
        // Aquí solo invertimos el orden como ejemplo
        sortedProducts.reverse()
        break
      default:
        // "featured" - mantener el orden original
        sortedProducts = initialProducts[category as keyof typeof initialProducts]
        break
    }

    setProducts(sortedProducts)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-black mb-4">{title}</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        <div>
          <select
            className="border border-gray-200 rounded-md px-3 py-2 bg-white text-black"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}
