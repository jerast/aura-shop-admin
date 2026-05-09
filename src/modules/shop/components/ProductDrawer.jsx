import { useState, useEffect } from "react"
import { X, Upload, ChevronDown } from "lucide-react"
import { toast } from "sonner"
import cn from "@shared/utils/className"

const emptyForm = {
  name: "",
  category: "",
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

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Categoria</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value)}
                    className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Seleccione una</option>
                    <option value="1">Vestidos</option>
                    <option value="2">Pantalones</option>
                    <option value="3">Blusas</option>
                    <option value="4">Chaquetas</option>
                    <option value="5">Faldas</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              {/* <div className="grid grid-cols-1 gap-4">
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
              </div> */}
            </div>
          </section>

          <section>
            <label className="mb-2 block text-sm font-medium text-foreground">Imagen</label>
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

              {/* <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
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
              </div> */}

              {/* {form.discountEnabled && (
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
              )} */}
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

export default ProductDrawer
