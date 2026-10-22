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

- `src/data/cv.json`: 日英共通のプロフィール・業績データ（日本語を基準に保持）
- `src/data/en.json`: 日本語データに対応する英訳。日付・DOI・レコードは共通データを参照
- `src/components/profile.tsx`: 日英共通のページ構成・図版・見出し
- `src/app/globals.css`: 配色、文字組み、レスポンシブレイアウト
- `src/app/(ja)` と `src/app/(english)`: 各言語の静的ページと文書言語
- `src/app/metadata.ts`: 各言語のタイトル、canonical、hreflang

日本語版は `/cv-website/`、英語版は `/cv-website/en/` です。ページ全体を静的生成し、ヘッダーの JA / EN で切り替えます。`npm run build` は両言語の文書言語、リンク、翻訳の不足、業績の欠落も検査します。

## プロフィールの確認資料（2026-10-22）

- [Tayo 本人プロフィール](https://tayo.jp/users/q66IkcW3aHN9HbNpl4ob98nb3Vr1): 学歴・職歴、2025年の追加発表、研究室・研究者識別子へのリンク
- [金沢大学 NanoLSI](https://nanolsi.kanazawa-u.ac.jp/about/members/computational-science/) と [奥田研究室](https://mechgen.jp/member.html): 現所属・職位、博士（工学）
- [J-GLOBAL（researchmap 登録情報の転載）](https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202501018022058389): 2026-08-19 更新の登録情報。2026年の発表、職歴、委員歴、所属学会
- [JBSE 出版社ページ](https://www.jstage.jst.go.jp/article/jbse/21/2/21_25-00417/_article/-char/en): 2026年の論文・著者・巻号・DOI
- [BioSystems 出版社ページ](https://www.sciencedirect.com/science/article/pii/S0303264725002412): 2025年の正式出版情報。旧プレプリントの掲載を正式論文に更新
- [APBiomech 2025](https://www.apbiomec2025.auckland.ac.nz/): 会場・開催日
- [第38回バイオエンジニアリング講演会のポスター番号表](https://www.jsme.or.jp/conference/bioconf26/files/講演番号_poster.pdf): P2-59、2026-06-14

[researchmap 本体](https://researchmap.jp/ryunosuke_suzuki) と公開 API は確認時に利用できなかったため、上記の公開情報で照合しました。連絡先メールアドレスは本人指定のものです。2026年のセミナー2件は年のみ確認できたため、月日を補っていません。2026年の追加発表3件の共著者は確認できず、著者欄を空欄としています。

従来の業績は保持しています（Tayo の掲載件数とは一致しません）。以前からある助成金額は既存データを引き継いでいます。日本語の発表題目等の英訳は本サイト用の参考訳です。
