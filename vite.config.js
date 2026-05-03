import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	base: './',
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
			'@products': path.resolve(__dirname, './src/modules/products'),
			'@orders': path.resolve(__dirname, './src/modules/orders'),
			'@customers': path.resolve(__dirname, './src/modules/customers'),
			'@discounts': path.resolve(__dirname, './src/modules/discounts'),
			'@settings': path.resolve(__dirname, './src/modules/settings'),
		},
	},
})
