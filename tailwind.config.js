/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        seaBlue: `#8CC8C5`,
        body: `#F8F8F2`,
        main: `#F8F8F2`,
        text: `#231f20`,
        primary: `#575558`,
      },
    },
  },
  plugins: [require(`tailwindcss`), require(`precss`), require(`autoprefixer`)],
}
