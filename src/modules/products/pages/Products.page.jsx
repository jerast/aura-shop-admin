import cn  from '@shared/utils/className'
import { useEffect, useMemo, useState } from "react"
import { Search, Grid3X3, List, Plus, Edit2, Copy, Trash2, X, Upload, ChevronDown } from "lucide-react"
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

function ProductDrawer({ open, onClose, onSave, editingProduct }) {
  const [form, setForm] = useState(emptyForm)
  const currentProduct = editingProduct

  useEffect(() => {
    if (currentProduct) {
      setForm({
        name: currentProduct.name,
        category: currentProduct.category,
        brand: "LUXE",
        description: `Edicion de ${currentProduct.name}`,
        price: String(currentProduct.price),
        discountEnabled: Boolean(currentProduct.discount),
        discountType: "percentage",
        discountValue: currentProduct.discount ? String(currentProduct.discount) : "",
        sku: `LUX-${currentProduct.id}`,
        stock: String(currentProduct.stock),
      })
      return
    }

    setForm(emptyForm)
  }, [currentProduct, open])

  if (!open) return null

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSave(event) {
    event.preventDefault()

    const payload = {
      name: form.name || "Nuevo producto",
      category: form.category,
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
      discount: form.discountEnabled ? Number(form.discountValue || 0) : null,
    }

    onSave(payload)
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-[480px] overflow-y-auto border-l border-border bg-card shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            {currentProduct ? "Editar producto" : "Anadir Producto"}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-muted">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8 p-6">
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Informacion basica</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Nombre del Producto</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Ej: Vestido Floral Midi"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Descripcion</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Describe el producto..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Categoria</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(event) => updateField("category", event.target.value)}
                      className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>Vestidos</option>
                      <option>Pantalones</option>
                      <option>Blusas</option>
                      <option>Chaquetas</option>
                      <option>Faldas</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Marca</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(event) => updateField("brand", event.target.value)}
                    placeholder="Ej: LUXE"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Imagenes</h3>
            <button
              type="button"
              onClick={() => toast.success("Carga de imagen lista para integrar")}
              className="w-full cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50"
            >
              <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Arrastra imagenes aqui</p>
              <p className="mt-1 text-xs text-muted-foreground">o haz clic para seleccionar</p>
            </button>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Precio</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Precio Base</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">EUR</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(event) => updateField("price", event.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-input bg-background py-3 pl-14 pr-4 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <span className="text-sm font-medium text-foreground">Aplicar Descuento</span>
                <button
                  type="button"
                  onClick={() => updateField("discountEnabled", !form.discountEnabled)}
                  className={cn(
                    "relative h-6 w-11 overflow-hidden rounded-full transition-colors",
                    form.discountEnabled ? "bg-primary" : "bg-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 h-4 w-4 rounded-full bg-card shadow-sm transition-transform",
                      form.discountEnabled ? "-translate-x-5" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {form.discountEnabled && (
                <div className="animate-in slide-in-from-top-2 space-y-4 rounded-lg border border-border bg-secondary/30 p-4 duration-200 fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Tipo</label>
                      <div className="relative">
                        <select
                          value={form.discountType}
                          onChange={(event) => updateField("discountType", event.target.value)}
                          className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="percentage">Porcentaje</option>
                          <option value="fixed">Cantidad fija</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Valor</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={form.discountValue}
                          onChange={(event) => updateField("discountValue", event.target.value)}
                          placeholder="25"
                          className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-8 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {form.discountType === "percentage" ? "%" : "EUR"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Inventario</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(event) => updateField("sku", event.target.value)}
                  placeholder="LUX-001"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Cantidad</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(event) => updateField("stock", event.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </section>

          <div className="sticky bottom-0 flex gap-3 border-t border-border bg-card px-0 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Guardar borrador
            </button>
            <button type="submit" className="flex-1 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              {currentProduct ? "Guardar cambios" : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
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

  function handleDuplicate(product) {
    const duplicatedProduct = {
      ...product,
      id: Date.now(),
      name: `${product.name} Copia`,
    }

    setProducts((current) => [duplicatedProduct, ...current])
    toast.success(`Se duplico ${product.name}`)
  }

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
          <div
            key={product.id}
            className={cn(
              "group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
              viewMode === "list" && "flex flex-col sm:flex-row"
            )}
          >
            <div className={cn("relative bg-muted", viewMode === "grid" ? "aspect-square" : "sm:w-56 sm:shrink-0")}>
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-primary/20">
                {product.name.charAt(0)}
              </div>
              {product.discount && (
                <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  -{product.discount}%
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/0 opacity-0 transition-colors group-hover:bg-foreground/5 group-hover:opacity-100">
                <button type="button" onClick={() => handleEdit(product)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-muted">
                  <Edit2 className="h-4 w-4 text-foreground" />
                </button>
                <button type="button" onClick={() => handleDuplicate(product)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-muted">
                  <Copy className="h-4 w-4 text-foreground" />
                </button>
                <button type="button" onClick={() => handleDelete(product.id)} className="rounded-lg bg-card p-2 shadow-md transition-colors hover:bg-destructive hover:text-primary-foreground">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <span className="mb-2 inline-block rounded-full border border-primary/30 px-2 py-0.5 text-xs font-medium text-primary">
                {product.category}
              </span>
              <h3 className="font-medium text-foreground">{product.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold text-foreground">EUR {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">EUR {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      product.status === "active" && "bg-[--status-delivered-text]",
                      product.status === "low" && "bg-[--status-processing-text]",
                      product.status === "out" && "bg-[--status-cancelled-text]"
                    )}
                  />
                  <span className="text-xs text-muted-foreground">{statusConfig[product.status].label}</span>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">{product.stock} uds</span>
              </div>
            </div>
          </div>
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
