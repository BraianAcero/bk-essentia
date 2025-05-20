import { notFound } from "next/navigation"
import CategoryPageClient from "@/components/category-page-client"

// Marcar como estático para la exportación
export const dynamic = "force-static"

// Generar rutas estáticas para las categorías
export function generateStaticParams() {
  return [{ category: "men" }, { category: "women" }, { category: "arabian" }, { category: "unisex" }]
}

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

const categoryTitles = {
  men: "Men's Collection",
  women: "Women's Collection",
  arabian: "Arabian Collection",
  unisex: "Unisex Collection",
}

const categoryDescriptions = {
  men: "Bold and sophisticated fragrances crafted for the modern man. Discover scents that embody strength, elegance, and confidence.",
  women:
    "Elegant and captivating scents designed for the modern woman. Explore fragrances that express femininity, grace, and allure.",
  arabian:
    "Rich and exotic fragrances inspired by Arabian traditions. Experience the luxury of oud, amber, and other precious ingredients.",
  unisex:
    "Versatile and contemporary fragrances designed for everyone. Discover scents that transcend traditional boundaries and appeal to all.",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params

  // Check if category exists
  if (!["men", "women", "arabian", "unisex"].includes(category)) {
    notFound()
  }

  const title = categoryTitles[category as keyof typeof categoryTitles]
  const description = categoryDescriptions[category as keyof typeof categoryDescriptions]

  // Move the client-side functionality to a client component
  return <CategoryPageClient category={category} title={title} description={description} />
}
