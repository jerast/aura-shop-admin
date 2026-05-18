import { toast } from "sonner"
import api from "@app/config/api.config"

export async function getCategories () {
  try {
    const { data } = await api.get(`/categories`)
    
    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return []
    }
    
    return data.categories
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al momento de obtener las categorias, recarga e inténtalo de nuevo.')
    return []
  }  
}
