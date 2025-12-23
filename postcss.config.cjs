// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ⬅️ v4 requires this exact name
    'autoprefixer': {},
  },
};