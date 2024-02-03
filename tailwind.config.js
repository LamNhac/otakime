/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beVietNamPro: ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  corePlugins: {
    preflight: false
  },    
  plugins: [],
};
