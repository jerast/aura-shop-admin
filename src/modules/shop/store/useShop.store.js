import { create } from 'zustand'

export const useShopStore = create((set) => ({
  products: [],
  categories: [],
  isLoading: false,
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  toggleLoading: (isLoading) => set({ isLoading }),
}))
