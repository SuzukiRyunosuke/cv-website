import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "out");
const destination = path.join(root, "docs");
if (!existsSync(path.join(output, "index.html"))) {
  throw new Error("Static export is missing. Run next build first.");
}
// docs/ is exclusively generated output; source files live under src/.
rmSync(destination, { recursive: true, force: true });
cpSync(output, destination, { recursive: true });
writeFileSync(path.join(destination, ".nojekyll"), "");
console.log("Static site generated in docs/ for GitHub Pages.");
