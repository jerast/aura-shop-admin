import { useState, useMemo } from "react"
import { toast } from "sonner"
import { useShopStore } from '@shop/store/useShop.store'

function useProducts () {
  const [viewMode, setViewMode] = useState("grid")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorias")
  const [search, setSearch] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)

  const products = useShopStore(state => state.products)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)

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

  function handleDelete(productId) {
    toast.success("Producto eliminado del listado")
  }

  function handleSaveProduct(payload) {
    toast.success(editingProduct ? "Producto actualizado" : "Producto creado")
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
    handleDelete,
    handleSaveProduct   
  }
}

export default useProducts
