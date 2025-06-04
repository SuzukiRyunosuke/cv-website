// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next.js App Router を使っている場合
    "./src/app/**/*.{js,ts,jsx,tsx}",
    // pages ディレクトリを使っているなら
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    // components フォルダを使っているなら
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};