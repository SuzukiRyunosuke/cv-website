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

const nextConfig: NextConfig = {
  output: 'export',
  //distDir: 'docs',

  // 本番環境時 (GitHub Pages のとき) のみ
  basePath: '',
  // ここで「/cv-website/_next」をプレフィックスにする
  assetPrefix: '',
};

export default nextConfig;