import { useState, useMemo } from "react"
import { toast } from "sonner"
import { useShopStore } from '@shop/store/useShop.store'
import { updateProduct, createProduct } from '@shop/services/products.services'

function useProducts () {
  const [viewMode, setViewMode] = useState("grid")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Todas las categorias")
  const [search, setSearch] = useState("")
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const products = useShopStore(state => state.products)
  const setProducts = useShopStore(state => state.setProducts)

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      if (product.status === false) return false

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

  async function handleSaveProduct(payload) {
    setIsSaving(true)
    
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, payload)
        console.log(updated);
        
        if (updated) {
          setProducts(products.map(p => p.id === editingProduct.id ? updated : p))
          toast.success("Producto actualizado")
        }
      } else {
        const created = await createProduct(payload)
        if (created) {
          setProducts([created, ...products])
          toast.success("Producto creado")
        }
      }
    } catch (error) {
      toast.error("Error al guardar el producto")
    } finally {
      setIsSaving(false)
      setDrawerOpen(false)
      setEditingProduct(null)
    }
  }

  return {
    viewMode,
    drawerOpen,
    selectedCategory,
    search,
    editingProduct,
    isSaving,
    
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