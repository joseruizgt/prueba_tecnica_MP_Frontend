/* eslint-disable no-undef */
import { defineConfig } from 'vite'
// import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'
import path from "path";

// eslint-disable-next-line no-unused-vars
export default defineConfig({
  // Resto de la configuración de Vite...
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, "_static")
  }
});