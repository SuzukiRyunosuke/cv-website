# Ryunosuke Suzuki — Research profile

研究者プロフィール。Next.js の静的エクスポートを GitHub Pages で公開します。

公開 URL: https://suzukiryunosuke.github.io/cv-website/

## 開発

Node.js 22 以上と npm を使用します。

```sh
npm ci
npm run dev
```

開発時は http://localhost:3000/ で確認できます。

## 公開用ビルド・表示確認

```sh
npm run build
npm run preview
```

`npm run build` は Next.js の静的エクスポートを `out/` に生成し、公開用の `docs/` にコピーします。その後、CSS・JavaScript・アイコンの参照先、ページ内リンク、業績データの欠落を検査します。

http://127.0.0.1:4173/cv-website/ で公開時と同じサブパスの表示を確認できます。`PORT` 環境変数でポートを変更できます。

GitHub Pages の公開元は **main ブランチの /docs** を使用します。ソースを変更したら `npm run build` を実行し、生成された `docs/` とソースを一緒にコミットしてください。main へ反映されると GitHub Pages が再公開します。`docs/` は生成ファイルなので直接編集しません。

- `basePath: /cv-website` により、CSS などを正しい公開先から読み込みます。
- `docs/.nojekyll` により、GitHub Pages が `_next/` を除外するのを防ぎます。
- 旧式の `next export` コマンドは不要です。`output: "export"` を使用しています。
- フォント・図版は外部サービスからの読み込みに依存しません。

## 内容とデザインの更新

- `src/data/cv.json`: 既存のプロフィール・業績データ
- `src/app/page.tsx`: ページ構成、研究紹介文、業績の表示
- `src/app/globals.css`: 配色、文字組み、レスポンシブレイアウト
- `src/app/layout.tsx`: ページタイトル・説明文・言語設定

研究業績のデータは従来の内容を保持しています。所属や在籍状況、採択済表記などの更新は `cv.json` で行ってください。
