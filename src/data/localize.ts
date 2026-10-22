import cv from "./cv.json";
import translations from "./en.json";

export type Language = "ja" | "en";
const english: Record<string, string> = translations;

// Keep dates, identifiers, and records in one source; only prose is translated.
export function getCV(language: Language): typeof cv {
  return language === "ja" ? cv : JSON.parse(JSON.stringify(cv, (_key, value) =>
    typeof value === "string" ? english[value] ?? value : value
  ));
}
