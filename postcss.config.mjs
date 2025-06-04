// postcss.config.mjs

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// オブジェクトを config という変数に代入
const config = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};

// 変数を export default する
export default config;