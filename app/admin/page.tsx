"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Tipos para los productos
interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  notes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
  size?: string
  concentration?: string
}

// Tipos para los pedidos
interface Order {
  id: string
  customer: string
  date: string
  status: string
  total: number
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
}

// Tipos para la configuración
interface StoreSettings {
  name: string
  email: string
  phone: string
  address: string
}

export default function AdminPage() {
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Estado para productos
  const [products, setProducts] = useState<Product[]>([
    {
      id: "m1",
      name: "Midnight Essence",
      category: "men",
      price: 89.99,
      description: "A sophisticated blend of bergamot, black pepper, and cedarwood.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "w1",
      name: "Rose Elixir",
      category: "women",
      price: 89.99,
      description: "A captivating blend of Bulgarian rose, peony, and vanilla.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "a1",
      name: "Oud Royale",
      category: "arabian",
      price: 129.99,
      description: "A luxurious blend of rare oud, saffron, and rose.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "u1",
      name: "Citrus Harmony",
      category: "unisex",
      price: 99.99,
      description: "A refreshing blend of citrus notes with hints of jasmine and cedar.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  // Estado para nuevo producto
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "/placeholder.svg?height=200&width=200",
    notes: {
      top: [],
      middle: [],
      base: [],
    },
  })

  // Estado para pedidos
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord1",
      customer: "John Doe",
      date: "2023-04-15",
      status: "Completed",
      total: 179.98,
      items: [{ id: "m1", name: "Midnight Essence", quantity: 2, price: 89.99 }],
    },
    {
      id: "ord2",
      customer: "Jane Smith",
      date: "2023-04-16",
      status: "Processing",
      total: 129.99,
      items: [{ id: "a1", name: "Oud Royale", quantity: 1, price: 129.99 }],
    },
  ])

  // Estado para configuración
  const [settings, setSettings] = useState<StoreSettings>({
    name: "BK ESSENTIA",
    email: "info@bkessentia.com",
    phone: "+1 (123) 456-7890",
    address: "123 Fragrance Avenue\nPerfume City, PC 12345",
  })

  // Estado para imágenes seleccionadas
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({})

  // Estado para alertas
  const [alert, setAlert] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  })

  // Estado para producto en edición
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const storedProducts = localStorage.getItem("bk-products")
    const storedOrders = localStorage.getItem("bk-orders")
    const storedSettings = localStorage.getItem("bk-settings")
    const storedLoginState = localStorage.getItem("bk-admin-logged-in")

    if (storedProducts) setProducts(JSON.parse(storedProducts))
    if (storedOrders) setOrders(JSON.parse(storedOrders))
    if (storedSettings) setSettings(JSON.parse(storedSettings))
    if (storedLoginState === "true") setIsLoggedIn(true)
  }, [])

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (products.length > 0) localStorage.setItem("bk-products", JSON.stringify(products))
    if (orders.length > 0) localStorage.setItem("bk-orders", JSON.stringify(orders))
    localStorage.setItem("bk-settings", JSON.stringify(settings))
    localStorage.setItem("bk-admin-logged-in", isLoggedIn.toString())
  }, [products, orders, settings, isLoggedIn])

  // Mostrar alerta temporalmente
  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ show: true, type, message })
    setTimeout(() => {
      setAlert({ ...alert, show: false })
    }, 3000)
  }

  // Manejar inicio de sesión
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "admin@bkessentia.com" && password === "admin123") {
      setIsLoggedIn(true)
      showAlert("success", "¡Inicio de sesión exitoso!")
    } else {
      showAlert("error", "Credenciales inválidas")
    }
  }

  // Manejar cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("bk-admin-logged-in")
  }

  // Manejar carga de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImages({
            ...selectedImages,
            [id]: event.target.result as string,
          })

          if (editingProduct) {
            setEditingProduct({
              ...editingProduct,
              image: event.target.result as string,
            })
          } else {
            setNewProduct({
              ...newProduct,
              image: event.target.result as string,
            })
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Eliminar imagen
  const removeImage = (id: string) => {
    const newImages = { ...selectedImages }
    delete newImages[id]
    setSelectedImages(newImages)

    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        image: "/placeholder.svg?height=200&width=200",
      })
    } else {
      setNewProduct({
        ...newProduct,
        image: "/placeholder.svg?height=200&width=200",
      })
    }
  }

  // Manejar cambios en el formulario de nuevo producto
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === "price" ? Number.parseFloat(value) : value,
      })
    } else {
      setNewProduct({
        ...newProduct,
        [name]: name === "price" ? Number.parseFloat(value) : value,
      })
    }
  }

  // Manejar cambio de categoría
  const handleCategoryChange = (value: string) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        category: value,
      })
    } else {
      setNewProduct({
        ...newProduct,
        category: value,
      })
    }
  }

  // Manejar cambios en las notas
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>, noteType: "top" | "middle" | "base") => {
    const notes = e.target.value.split(",").map((note) => note.trim())

    if (editingProduct && editingProduct.notes) {
      setEditingProduct({
        ...editingProduct,
        notes: {
          ...editingProduct.notes,
          [noteType]: notes,
        },
      })
    } else if (newProduct.notes) {
      setNewProduct({
        ...newProduct,
        notes: {
          ...newProduct.notes,
          [noteType]: notes,
        },
      })
    }
  }

  // Añadir nuevo producto
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      showAlert("error", "Por favor completa los campos obligatorios")
      return
    }

    const productId = `${newProduct.category?.charAt(0)}${products.length + 1}`
    const product: Product = {
      id: productId,
      name: newProduct.name || "",
      category: newProduct.category || "",
      price: newProduct.price || 0,
      description: newProduct.description || "",
      image: newProduct.image || "/placeholder.svg?height=200&width=200",
      notes: newProduct.notes,
      size: "100ml",
      concentration: "Eau de Parfum",
    }

    setProducts([...products, product])

    // Resetear formulario
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "/placeholder.svg?height=200&width=200",
      notes: {
        top: [],
        middle: [],
        base: [],
      },
    })
    setSelectedImages({})

    showAlert("success", "Producto añadido correctamente")
  }

  // Editar producto
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setSelectedImages({ main: product.image })
  }

  // Guardar cambios de producto
  const handleSaveProduct = () => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? editingProduct : p))

    setProducts(updatedProducts)
    setEditingProduct(null)
    setSelectedImages({})

    showAlert("success", "Producto actualizado correctamente")
  }

  // Eliminar producto
  const handleDeleteProduct = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)
      showAlert("success", "Producto eliminado correctamente")
    }
  }

  // Cambiar estado de pedido
  const handleOrderStatusChange = (orderId: string, status: string) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    setOrders(updatedOrders)
    showAlert("success", "Estado del pedido actualizado")
  }

  // Guardar configuración
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    showAlert("success", "Configuración guardada correctamente")
  }

  // Manejar cambios en la configuración
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingProduct(null)
    setSelectedImages({})
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-black">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {alert.show && (
              <Alert
                className={`mb-4 ${alert.type === "error" ? "bg-red-50 text-red-800 border-red-200" : "bg-green-50 text-green-800 border-green-200"}`}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bkessentia.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-6 bg-black hover:bg-gray-800" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-black">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {alert.show && (
        <Alert
          className={`mb-4 ${alert.type === "error" ? "bg-red-50 text-red-800 border-red-200" : "bg-green-50 text-green-800 border-green-200"}`}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="add-product">{editingProduct ? "Edit Product" : "Add Product"}</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>View, edit, and delete your perfume products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Image</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </td>
                        <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleEditProduct(product)
                                document.querySelector('[data-value="add-product"]')?.click()
                              }}
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No products found. Add your first product.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-product">
          <Card>
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
              <CardDescription>
                {editingProduct
                  ? "Update the details of your existing product"
                  : "Create a new perfume product to add to your catalog"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Midnight Essence"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men's Collection</SelectItem>
                      <SelectItem value="women">Women's Collection</SelectItem>
                      <SelectItem value="arabian">Arabian Collection</SelectItem>
                      <SelectItem value="unisex">Unisex Collection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 89.99"
                    value={editingProduct ? editingProduct.price : newProduct.price || ""}
                    onChange={handleProductChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product..."
                    className="min-h-[100px]"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={handleProductChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    {editingProduct?.image || selectedImages["main"] ? (
                      <div className="relative">
                        <img
                          src={editingProduct?.image || selectedImages["main"] || "/placeholder.svg"}
                          alt="Product preview"
                          className="max-h-[200px] rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          onClick={() => removeImage("main")}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
                        <Input
                          id="product-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "main")}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("product-image")?.click()}
                        >
                          Select Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Fragrance Notes</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="top-notes" className="text-sm">
                        Top Notes
                      </Label>
                      <Textarea
                        id="top-notes"
                        placeholder="e.g. Bergamot, Black Pepper, Cardamom"
                        className="min-h-[80px]"
                        value={editingProduct?.notes?.top.join(", ") || newProduct.notes?.top.join(", ") || ""}
                        onChange={(e) => handleNotesChange(e, "top")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="middle-notes" className="text-sm">
                        Middle Notes
                      </Label>
                      <Textarea
                        id="middle-notes"
                        placeholder="e.g. Lavender, Geranium, Sage"
                        className="min-h-[80px]"
                        value={editingProduct?.notes?.middle.join(", ") || newProduct.notes?.middle.join(", ") || ""}
                        onChange={(e) => handleNotesChange(e, "middle")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="base-notes" className="text-sm">
                        Base Notes
                      </Label>
                      <Textarea
                        id="base-notes"
                        placeholder="e.g. Cedarwood, Vetiver, Amber"
                        className="min-h-[80px]"
                        value={editingProduct?.notes?.base.join(", ") || newProduct.notes?.base.join(", ") || ""}
                        onChange={(e) => handleNotesChange(e, "base")}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingProduct ? (
                <>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button className="bg-black hover:bg-gray-800" onClick={handleSaveProduct}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button className="bg-black hover:bg-gray-800 ml-auto" onClick={handleAddProduct}>
                  Add Product
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              defaultValue={order.status}
                              onValueChange={(value) => handleOrderStatusChange(order.id, value)}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Change status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">No orders to display</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your store settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6" onSubmit={handleSaveSettings}>
                <div className="grid gap-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" name="name" value={settings.name} onChange={handleSettingsChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="store-email">Contact Email</Label>
                  <Input
                    id="store-email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleSettingsChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="store-phone">Contact Phone</Label>
                  <Input id="store-phone" name="phone" value={settings.phone} onChange={handleSettingsChange} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="store-address">Store Address</Label>
                  <Textarea
                    id="store-address"
                    name="address"
                    value={settings.address}
                    onChange={handleSettingsChange}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Change Password</Label>
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="bg-black hover:bg-gray-800 text-white" onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
