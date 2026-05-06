import { useState, useMemo } from "react"
import { toast } from "sonner"

const initialProducts = [
  { id: 1, name: "Vestido Floral Midi", category: "Vestidos", price: 89.99, originalPrice: 119.99, stock: 45, status: "active", discount: 25 },
  { id: 2, name: "Blazer Oversized Negro", category: "Chaquetas", price: 149.99, originalPrice: null, stock: 23, status: "active", discount: null },
  { id: 3, name: "Pantalon Wide Leg Beige", category: "Pantalones", price: 69.99, originalPrice: null, stock: 8, status: "low", discount: null },
  { id: 4, name: "Top Satinado Rosa", category: "Blusas", price: 45.99, originalPrice: 59.99, stock: 67, status: "active", discount: 20 },
  { id: 5, name: "Falda Plisada Midi", category: "Faldas", price: 79.99, originalPrice: null, stock: 34, status: "active", discount: null },
  { id: 6, name: "Cardigan Oversize Crema", category: "Punto", price: 89.99, originalPrice: 99.99, stock: 0, status: "out", discount: 10 },
  { id: 7, name: "Vestido Camisero Blanco", category: "Vestidos", price: 95.0, originalPrice: null, stock: 52, status: "active", discount: null },
  { id: 8, name: "Pantalon Cargo Negro", category: "Pantalones", price: 75.0, originalPrice: null, stock: 38, status: "active", discount: null },
]

function useProducts () {
  const [products, setProducts] = useState(initialProducts)
  const [viewMode, setViewMode] = useState("grid")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorias")
  const [search, setSearch] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)

      const matchesCategory =
        selectedCategory === "Todas las categorias" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, search, selectedCategory])

  function openNewProductDrawer() {
    setEditingProduct(null)
    setDrawerOpen(true)
  }

  function handleEdit(product) {
    setEditingProduct(product)
    setDrawerOpen(true)
  }

  /* function handleDuplicate(product) {
    const duplicatedProduct = {
      ...product,
      id: Date.now(),
      name: `${product.name} Copia`,
    }

    setProducts((current) => [duplicatedProduct, ...current])
    toast.success(`Se duplico ${product.name}`)
  } */

  function handleDelete(productId) {
    setProducts((current) => current.filter((product) => product.id !== productId))
    toast.success("Producto eliminado del listado")
  }

  function handleSaveProduct(payload) {
    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
              ...product,
              ...payload,
              status: payload.stock <= 0 ? "out" : payload.stock < 10 ? "low" : "active",
            }
            : product
        )
      )
      toast.success("Producto actualizado")
    } else {
      const newProduct = {
        id: Date.now(),
        name: payload.name,
        category: payload.category,
        price: payload.price || 0,
        originalPrice: null,
        stock: payload.stock || 0,
        status: payload.stock <= 0 ? "out" : payload.stock < 10 ? "low" : "active",
        discount: payload.discount,
      }

      setProducts((current) => [newProduct, ...current])
      toast.success("Producto creado")
    }

    setDrawerOpen(false)
    setEditingProduct(null)
  }

  return {
    viewMode,
    drawerOpen,
    selectedCategory,
    search,
    editingProduct,
    
    setViewMode,
    setDrawerOpen,
    setSelectedCategory,
    setSearch,
    setEditingProduct,

    filteredProducts,
    openNewProductDrawer,
    handleEdit,
    // handleDuplicate,
    handleDelete,
    handleSaveProduct   
  }
}

export default useProducts
