module.exports = {
  plugins: {
    // Corrected: Use the dedicated PostCSS plugin for Tailwind CSS
    tailwindcss: require('@tailwindcss/postcss'),
    autoprefixer: {},
  },
};