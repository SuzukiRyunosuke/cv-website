import type { Metadata } from "next";
import "./globals.css";

const title = "Ryunosuke Suzuki | 鈴木 龍之介";
const description = "鈴木龍之介の研究者プロフィール。バイオメカニクス・生物物理学を中心とした研究、論文、学会発表、経歴を紹介します。";

export const metadata: Metadata = {
  metadataBase: new URL("https://suzukiryunosuke.github.io/cv-website/"),
  title,
  description,
  alternates: { canonical: "https://suzukiryunosuke.github.io/cv-website/" },
  openGraph: { title, description, type: "website", locale: "ja_JP", url: "https://suzukiryunosuke.github.io/cv-website/" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
