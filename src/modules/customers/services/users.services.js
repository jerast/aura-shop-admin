import { toast } from "sonner"
import api from "@app/config/api.config"

export async function getUsers() {
  try {
    const { data } = await api.get(`/users`)

    if (!data.ok) {
      console.warn(data.message)
      toast.warning(data.message)
      return []
    }

    return data.users || []
  } catch (error) {
    console.error(error)
    toast.error('Algo pasó al obtener los usuarios, recarga e inténtalo de nuevo.')
    return []
  }
}
