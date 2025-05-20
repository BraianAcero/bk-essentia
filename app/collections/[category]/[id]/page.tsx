import { notFound } from "next/navigation"
import ProductPageClient from "@/components/product-page-client"

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

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const { category, id } = params

  // Check if category exists
  if (!["men", "women", "arabian", "unisex"].includes(category)) {
    notFound()
  }

  // We'll check if the product exists in the initial data
  // If not, we'll let the client component handle it with localStorage
  const initialCategoryProducts = initialProducts[category as keyof typeof initialProducts]
  const initialProduct = initialCategoryProducts.find((p) => p.id === id)

  // Siempre permitir productos dinámicos para la exportación estática
  const allowDynamicProducts = true

  if (!initialProduct && !allowDynamicProducts) {
    // If we can determine the product doesn't exist at build time and we're not allowing dynamic products
    notFound()
  }

  // Move the client-side functionality to a client component
  return <ProductPageClient category={category} id={id} />
}
