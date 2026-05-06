import { useMemo, useState } from "react"
import { Search, Grid3X3, List, Plus, ChevronDown } from "lucide-react"
import { toast } from "sonner"
import ProductDrawer from '@shop/components/ProductDrawer'
import ProductCard from '@shop/components/ProductCard'
import cn  from '@shared/utils/className'

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

const statusConfig = {
  active: { label: "En stock", className: "bg-[--status-delivered] text-[--status-delivered-text]" },
  low: { label: "Stock bajo", className: "bg-[--status-processing] text-[--status-processing-text]" },
  out: { label: "Agotado", className: "bg-[--status-cancelled] text-[--status-cancelled-text]" },
}

const emptyForm = {
  name: "",
  category: "Vestidos",
  brand: "",
  description: "",
  price: "",
  discountEnabled: false,
  discountType: "percentage",
  discountValue: "",
  sku: "",
  stock: "",
}

function ProductsPage() {
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

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Productos</h1>
          <p className="mt-1 text-muted-foreground">Gestiona el catalogo de tu tienda</p>
        </div>
        <button
          type="button"
          onClick={openNewProductDrawer}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" />
          Anadir Producto
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-11 pr-4 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="appearance-none rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Todas las categorias</option>
              <option>Vestidos</option>
              <option>Pantalones</option>
              <option>Blusas</option>
              <option>Chaquetas</option>
              <option>Faldas</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className="flex overflow-hidden rounded-lg border border-input">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "grid" ? "bg-secondary text-primary" : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 transition-colors",
                viewMode === "list" ? "bg-secondary text-primary" : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={cn(viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4")}>
        {filteredProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            viewMode={viewMode}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          No hay productos que coincidan con la busqueda actual.
        </div>
      )}

      <ProductDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />
    </div>
  )
}

export default ProductsPage
