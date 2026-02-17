const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3007;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const RU_PAGE = "arkham-graph-clean.html";
const EN_PAGE = "arkham-graph-clean-en.html";

function injectBaseHref(html) {
  return html.replace(/<head>/i, "<head><base href=\"/\">");
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const pathNorm = urlPath.replace(/\/$/, "") || "/";

  if (pathNorm === "/" || pathNorm === "/index.html") {
    const idxPath = path.join(ROOT, "index.html");
    fs.readFile(idxPath, (err, data) => {
      if (err || !data) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  if (pathNorm === "/ru" || pathNorm === "/ru/index.html") {
    const ruPath = path.join(ROOT, RU_PAGE);
    fs.readFile(ruPath, "utf8", (err, html) => {
      if (err || !html) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(injectBaseHref(html));
    });
    return;
  }

  if (pathNorm === "/en" || pathNorm === "/en/index.html") {
    const enPath = path.join(ROOT, EN_PAGE);
    fs.readFile(enPath, "utf8", (err, html) => {
      if (err || !html) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(injectBaseHref(html));
    });
    return;
  }

  let safePath = urlPath.replace(/^\//, "").replace(/^\\/, "");
  safePath = path.normalize(safePath).replace(/^(\.\.(\/|\\))+/, "");
  const filePath = path.join(ROOT, safePath);
  const relative = path.relative(ROOT, path.resolve(ROOT, safePath));
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }
    const ext = path.extname(filePath);
    const contentType = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`);
  console.log(`  /     — выбор языка`);
  console.log(`  /ru   — русская версия`);
  console.log(`  /en   — английская версия`);
});
