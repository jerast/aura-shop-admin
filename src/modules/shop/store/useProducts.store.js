import { create } from 'zustand'

export const useProductsStore = create((set) => ({
  products: [],
  isLoading: false,
  setProducts: (products) => set({ products }),
  toggleLoading: (isLoading) => set({ isLoading }),
}))
