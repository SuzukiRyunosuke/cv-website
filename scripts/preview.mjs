import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("../docs/", import.meta.url)));
const basePath = "/cv-website";
const port = Number(process.env.PORT ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };
createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("Bad request"); return; }
  if (pathname === "/" || pathname === basePath) { response.writeHead(302, { Location: `${basePath}/` }).end(); return; }
  let file = path.resolve(root, `.${pathname.slice(basePath.length)}`);
  if (!pathname.startsWith(`${basePath}/`) || (file !== root && !file.startsWith(`${root}${path.sep}`))) { response.writeHead(404).end("Not found"); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  const found = existsSync(file) && statSync(file).isFile();
  if (!found) file = path.join(root, "404.html");
  response.writeHead(found ? 200 : 404, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream", "Cache-Control": "no-store" });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}${basePath}/`));
