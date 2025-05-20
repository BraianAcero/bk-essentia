"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const [isWishlist, setIsWishlist] = useState(false)

  const handleAddToCart = () => {
    // Obtener carrito actual o inicializar uno nuevo
    const currentCart = localStorage.getItem("bk-cart")
    const cart = currentCart ? JSON.parse(currentCart) : []

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex((item: any) => item.id === id)

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      cart[existingItemIndex].quantity += 1
    } else {
      // Añadir nuevo item al carrito
      cart.push({
        id,
        name,
        price,
        image,
        category,
        quantity: 1,
      })
    }

    // Guardar carrito actualizado
    localStorage.setItem("bk-cart", JSON.stringify(cart))

    // Mostrar confirmación
    alert(`${name} added to cart!`)
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Wishlist Button */}
      <button
        className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
        onClick={() => setIsWishlist(!isWishlist)}
      >
        <Heart className={`h-5 w-5 ${isWishlist ? "fill-black text-black" : "text-gray-500"}`} />
      </button>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/collections/${category}/${id}`}>
          <h3 className="font-medium text-lg mb-1 text-gray-800 hover:text-black transition-colors">{name}</h3>
        </Link>
        <p className="text-black font-bold mb-3">${price.toFixed(2)}</p>
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white"
          onClick={(e) => {
            e.preventDefault() // Prevent any navigation
            handleAddToCart()
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
