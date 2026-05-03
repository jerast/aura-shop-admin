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
			'@products': path.resolve(__dirname, './src/modules/products'),
		},
	},
})
