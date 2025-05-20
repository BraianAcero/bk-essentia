"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Heart, Share2 } from "lucide-react"

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

// Datos iniciales de productos detallados
const initialProducts = {
  men: [
    {
      id: "m1",
      name: "Midnight Essence",
      price: 89.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "men",
      description:
        "A sophisticated blend of bergamot, black pepper, and cedarwood, creating a bold and mysterious scent perfect for evening wear.",
      notes: {
        top: ["Bergamot", "Black Pepper", "Cardamom"],
        middle: ["Lavender", "Geranium", "Sage"],
        base: ["Cedarwood", "Vetiver", "Amber"],
      },
      size: "100ml",
      concentration: "Eau de Parfum",
    },
    // Otros productos se cargarían dinámicamente
  ],
  women: [
    {
      id: "w1",
      name: "Rose Elixir",
      price: 89.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "women",
      description:
        "A captivating blend of Bulgarian rose, peony, and vanilla, creating an elegant and feminine scent that lasts all day.",
      notes: {
        top: ["Bergamot", "Pink Pepper", "Raspberry"],
        middle: ["Bulgarian Rose", "Peony", "Lily of the Valley"],
        base: ["Vanilla", "Patchouli", "White Musk"],
      },
      size: "100ml",
      concentration: "Eau de Parfum",
    },
    // Otros productos se cargarían dinámicamente
  ],
  arabian: [
    {
      id: "a1",
      name: "Oud Royale",
      price: 129.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "arabian",
      description:
        "A luxurious blend of rare oud, saffron, and rose, creating an opulent and long-lasting fragrance inspired by Arabian traditions.",
      notes: {
        top: ["Saffron", "Cinnamon", "Rose"],
        middle: ["Oud", "Amber", "Patchouli"],
        base: ["Sandalwood", "Musk", "Vanilla"],
      },
      size: "100ml",
      concentration: "Parfum",
    },
    // Otros productos se cargarían dinámicamente
  ],
  unisex: [
    {
      id: "u1",
      name: "Citrus Harmony",
      price: 99.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "unisex",
      description:
        "A refreshing blend of citrus notes with hints of jasmine and cedar, creating a vibrant and versatile scent suitable for all occasions.",
      notes: {
        top: ["Bergamot", "Lemon", "Grapefruit"],
        middle: ["Jasmine", "Neroli", "Green Tea"],
        base: ["Cedar", "White Musk", "Vetiver"],
      },
      size: "100ml",
      concentration: "Eau de Parfum",
    },
    // Otros productos se cargarían dinámicamente
  ],
}

export default function ProductPageClient({ category, id }: { category: string; id: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlist, setIsWishlist] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Cargar producto del localStorage o usar los iniciales
  useEffect(() => {
    const storedProducts = localStorage.getItem("bk-products")

    if (storedProducts) {
      const allProducts: Product[] = JSON.parse(storedProducts)
      const foundProduct = allProducts.find((p) => p.id === id && p.category === category)

      if (foundProduct) {
        // Asegurarse de que el producto tenga todas las propiedades necesarias
        const completeProduct = {
          ...foundProduct,
          description: foundProduct.description || "A luxurious fragrance with exceptional quality and lasting power.",
          notes: foundProduct.notes || {
            top: ["Citrus", "Spice", "Herbs"],
            middle: ["Floral", "Fruity", "Green"],
            base: ["Woody", "Musky", "Amber"],
          },
          size: foundProduct.size || "100ml",
          concentration: foundProduct.concentration || "Eau de Parfum",
        }
        setProduct(completeProduct)
        setLoading(false)
        return
      }
    }

    // Si no se encuentra en localStorage, buscar en los datos iniciales
    const initialCategoryProducts = initialProducts[category as keyof typeof initialProducts]
    const initialProduct = initialCategoryProducts.find((p) => p.id === id)

    if (initialProduct) {
      setProduct(initialProduct)
      setLoading(false)
    } else {
      // Instead of calling notFound() directly in the client component,
      // set a state that will show a not found message
      console.error(`Product with id ${id} not found in category ${category}`)
      setNotFound(true)
      setLoading(false)
    }
  }, [category, id])

  // Redirect to 404 page if product not found
  useEffect(() => {
    if (notFound) {
      router.push("/404")
    }
  }, [notFound, router])

  // Manejar cambio de cantidad
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    if (!product) return

    // Obtener carrito actual o inicializar uno nuevo
    const currentCart = localStorage.getItem("bk-cart")
    const cart = currentCart ? JSON.parse(currentCart) : []

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      cart[existingItemIndex].quantity += quantity
    } else {
      // Añadir nuevo item al carrito
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
      })
    }

    // Guardar carrito actualizado
    localStorage.setItem("bk-cart", JSON.stringify(cart))

    // Mostrar confirmación (en un caso real se usaría un toast o notificación)
    alert(`${product.name} added to cart!`)
  }

  // Si el producto aún no se ha cargado
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <p>Loading product...</p>
      </div>
    )
  }

  // Si el producto no existe
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-black mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-700 mb-6">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{product.concentration}</span>
              <span>•</span>
              <span>{product.size}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="px-4 py-2 border-y border-x-0 border-input">{quantity}</div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-none"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="flex-1 bg-black hover:bg-gray-800 text-white" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsWishlist(!isWishlist)}>
              <Heart className={`h-5 w-5 ${isWishlist ? "fill-black text-black" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Fragrance Notes */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-medium text-black mb-4">Fragrance Notes</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Top Notes</h3>
                <ul className="text-gray-700">
                  {product.notes?.top.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Middle Notes</h3>
                <ul className="text-gray-700">
                  {product.notes?.middle.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Base Notes</h3>
                <ul className="text-gray-700">
                  {product.notes?.base.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
