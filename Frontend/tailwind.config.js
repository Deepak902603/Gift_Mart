/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
     "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        bricolage:['"Bricolage Grotesque"','sans-serif'],
        jakarta:['"Plus jakarta Sans",sans-serif'],
      },
    },
  },
  plugins: [],
}

