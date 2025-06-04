/** @type {import('postcss').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},   // Tailwind v4以降の PostCSS プラグイン名
    "autoprefixer": {},
  },
};

export default config;
