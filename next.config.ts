// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静的 HTML エクスポートモード
  output: 'export',
  // ビルド成果物を docs/ フォルダに出力
  distDir: 'docs',
};

export default nextConfig;