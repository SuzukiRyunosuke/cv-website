// postcss.config.mjs（修正後）
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const config = {
  plugins: [
    tailwind(),       // @tailwindcss/postcss を呼び出す
    autoprefixer(),   // autoprefixer も呼び出す
  ],
};

export default config;