import { toast } from "sonner"
import api from "@app/config/api.config"

export async function getProducts () {
  try {
    const { data } = await api.get(`/products`)
    
    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return []
    }
    
    return data.products
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al momento de obtener los productos, recarga e inténtalo de nuevo.')
    return []
  }  
}

export async function updateProduct (id, payload) {
  try {
    const { data } = await api.put(`/products/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return null
    }
    
    return data.product
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al actualizar el producto, intenta de nuevo.')
    return null
  }
}

export async function createProduct (payload) {
  try {
    const { data } = await api.post(`/products`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return null
    }
    
    return data.product
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al crear el producto, intenta de nuevo.')
    return null
  }
}

export async function deleteProduct (id) {
  try {
    const { data } = await api.delete(`/products/${id}`)
    
    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return false
    }
    
    return true
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al eliminar el producto, intenta de nuevo.')
    return false
  }
}
