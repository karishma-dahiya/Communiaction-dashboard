/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup': "url('./assets/Login.png')"
      },
      colors: {
        'form-border': '#bebebf',
        'light-blue': '#007dfa',
        'light-gray':'#5A5A5D'
      }
    },
  },
  plugins: [],
}

