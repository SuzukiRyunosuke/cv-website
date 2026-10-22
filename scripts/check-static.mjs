import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../docs/", import.meta.url));
const basePath = "/cv-website";
assert.ok(existsSync(path.join(root, ".nojekyll")), "Missing .nojekyll: GitHub Pages must serve _next assets.");
function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith(".html") ? [file] : [];
  });
}
let assets = 0;
for (const file of htmlFiles(root)) {
  const html = readFileSync(file, "utf8");
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(raw)) continue;
    const url = new URL(raw.replaceAll("&amp;", "&"), `https://example.test${basePath}/${path.relative(root, file)}`);
    assert.ok(url.pathname.startsWith(`${basePath}/`), `${file}: incorrect Pages asset path: ${raw}`);
    let target = path.join(root, decodeURIComponent(url.pathname.slice(basePath.length)));
    assert.ok(existsSync(target), `${file}: missing local resource: ${raw}`);
    if (statSync(target).isDirectory()) target = path.join(target, "index.html");
    assert.ok(existsSync(target), `${file}: missing page: ${raw}`);
    assets += 1;
  }
}
const cv = JSON.parse(readFileSync(new URL("../src/data/cv.json", import.meta.url), "utf8"));
const english = JSON.parse(readFileSync(new URL("../src/data/en.json", import.meta.url), "utf8"));
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const [language, file] of [["ja", "index.html"], ["en", "en/index.html"]]) {
  const html = readFileSync(path.join(root, file), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${language}: duplicate HTML IDs.`);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `${language}: broken section link #${id}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${language}: expected one main heading.`);
  assert.ok(html.includes(`<html lang="${language}"`), `${language}: incorrect document language.`);
  for (const locale of ["ja", "en"]) assert.ok(html.includes(`hrefLang="${locale}"`), `${language}: missing alternate language ${locale}.`);
  for (const collection of [cv.publications, cv.international_conference_presentations, cv.domestic_invited_lectures, cv.domestic_presentations, cv.grants_and_fellowships]) {
    for (const record of collection) {
      const title = language === "en" ? english[record.title] ?? record.title : record.title;
      assert.ok(html.includes(escape(title)), `${language}: missing entry ${title}`);
    }
  }
  assert.ok(html.includes(`mailto:${cv.profile.contact.email}`), `${language}: incorrect contact email.`);
  for (const obsolete of ["Create Next App", "suzuki.ryunosuke.55s@st.kyoto-u.ac.jp", "博士後期課程 在籍", "採択済", "stroke-dasharray", "class=\"monogram\""]) {
    assert.ok(!html.includes(obsolete), `${language}: obsolete content: ${obsolete}`);
  }
  assert.ok(html.includes(language === "en" ? "Nano Life Science Institute" : "金沢大学 ナノ生命科学研究所"));
}
// A new Japanese entry must have an English translation before it can ship.
JSON.stringify(cv, (_key, value) => {
  if (typeof value === "string" && /[\u3040-\u30ff\u3400-\u9fff]/u.test(value)) {
    assert.ok(english[value], `Missing English translation: ${value}`);
  }
  return value;
});
console.log(`Verified ${assets} local references; both languages, section anchors, contact details, translations, and all publication/presentation/grant entries.`);
