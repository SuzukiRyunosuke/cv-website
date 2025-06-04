// // next.config.ts
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   // 静的 HTML エクスポートモード
//   output: 'export',
//   // ビルド成果物を docs/ フォルダに出力
//   distDir: 'docs',
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 静的 HTML エクスポートモード
  output: 'export',
  // ビルド成果物を docs/ フォルダに出力
  distDir: 'docs',

  // 本番環境（GitHub Pages）では "/cv-website" を basePath に指定
  basePath: isProd ? '/cv-website' : '',
  // 本番環境では JS/CSS/画像などに "/cv-website/" をプレフィックス
  assetPrefix: isProd ? '/cv-website/' : '',
};

export default nextConfig;