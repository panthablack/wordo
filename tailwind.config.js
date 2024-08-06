/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        wordo: {
          found: '#6aaa64',
          missing: '#787c7e',
          present: '#c9b458',
          keyboard: '#d3d6da',
        },
      },
    },
  },
  plugins: [],
}
