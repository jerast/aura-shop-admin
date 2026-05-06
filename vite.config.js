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
			'@auth': path.resolve(__dirname, './src/modules/auth'),
			'@dashboard': path.resolve(__dirname, './src/modules/dashboard'),
			'@shop': path.resolve(__dirname, './src/modules/shop'),
			'@orders': path.resolve(__dirname, './src/modules/orders'),
			'@customers': path.resolve(__dirname, './src/modules/customers'),
			'@discounts': path.resolve(__dirname, './src/modules/discounts'),
			'@settings': path.resolve(__dirname, './src/modules/settings'),
		},
	},
})
