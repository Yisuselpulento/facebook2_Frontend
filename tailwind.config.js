/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#18181b',
        secundary: '#0c0a09',
        font1: '#e2e8f0',
        font2: '#6b7280'
      }
    }
  },
  plugins: []
}
