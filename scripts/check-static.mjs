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
const index = readFileSync(path.join(root, "index.html"), "utf8");
const ids = [...index.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Duplicate HTML IDs.");
for (const [, id] of index.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `Broken section link: #${id}`);
assert.equal((index.match(/<h1\b/g) ?? []).length, 1, "Expected one main heading.");
assert.ok(index.includes('<html lang="ja"'), "Expected Japanese document language.");
assert.ok(!index.includes("Create Next App"), "Starter metadata must not be published.");
const cv = JSON.parse(readFileSync(new URL("../src/data/cv.json", import.meta.url), "utf8"));
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const collection of [cv.publications, cv.international_conference_presentations, cv.domestic_invited_lectures, cv.domestic_presentations, cv.grants_and_fellowships]) {
  for (const record of collection) assert.ok(index.includes(escape(record.title)), `Missing CV entry: ${record.title}`);
}
assert.ok(!index.includes(cv.profile.contact.phone), "Do not expose the unused phone field.");
console.log(`Verified ${assets} local references, section anchors, metadata, and all publication/presentation/grant entries.`);
