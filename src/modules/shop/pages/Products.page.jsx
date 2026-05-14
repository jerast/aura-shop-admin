import { Search, Grid3X3, List, Plus, ChevronDown } from "lucide-react"
import useProducts from "@shop/hooks/useProducts"
import ProductDrawer from '@shop/components/ProductDrawer'
import ProductCard from '@shop/components/ProductCard'
import cn  from '@shared/utils/className'
import { useShopStore } from '@shop/store/useShop.store'

function ProductsPage() {
  const {
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
  } = useProducts()

  const categories = useShopStore(state => state.categories)

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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
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
        isSaving={isSaving}
      />
    </div>
  )
}

export default ProductsPage
