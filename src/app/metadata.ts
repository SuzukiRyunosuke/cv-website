import type { Metadata } from "next";
import type { Language } from "../data/localize";

export function profileMetadata(language: Language): Metadata {
  const base = "https://suzukiryunosuke.github.io/cv-website/";
  const url = language === "ja" ? base : `${base}en/`;
  const title = language === "ja" ? "鈴木 龍之介 | Ryunosuke Suzuki" : "Ryunosuke Suzuki | Research profile";
  const description = language === "ja"
    ? "金沢大学ナノ生命科学研究所 特任助教・鈴木龍之介の研究者プロフィール。バイオメカニクス、生物物理学、連続体力学の研究、論文、経歴を紹介します。"
    : "Ryunosuke Suzuki, Assistant Professor at NanoLSI, Kanazawa University. Research in biomechanics, biophysics, and continuum mechanics; publications, talks, and background.";
  return {
    metadataBase: new URL(base), title, description,
    alternates: { canonical: url, languages: { ja: base, en: `${base}en/`, "x-default": base } },
    openGraph: { title, description, type: "website", url, locale: language === "ja" ? "ja_JP" : "en_US", alternateLocale: language === "ja" ? "en_US" : "ja_JP" },
  };
}
