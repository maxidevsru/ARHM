/**
 * Сборка статического сайта для GitHub Pages.
 * Создаёт папку docs/ с index.html, ru/index.html, en/index.html и ассетами.
 * В настройках репозитория: Settings → Pages → Source: Deploy from a branch → Branch: main, /docs
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUT = path.join(ROOT, "docs");
const ASSETS_DIR = "Intel Platform _ Arkham_files";

function injectBase(html, baseHref) {
  return html.replace(/<head>/i, "<head><base href=\"" + baseHref + "\">");
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

ensureDir(OUT);
ensureDir(path.join(OUT, "ru"));
ensureDir(path.join(OUT, "en"));

// Главная страница выбора языка (ссылки делаем относительными для /docs)
let indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
indexHtml = indexHtml.replace(/href="\/ru"/g, 'href="ru/"').replace(/href="\/en"/g, 'href="en/"');
fs.writeFileSync(path.join(OUT, "index.html"), indexHtml);

// Русская версия (граф)
let ruHtml = fs.readFileSync(path.join(ROOT, "arkham-graph-clean.html"), "utf8");
fs.writeFileSync(path.join(OUT, "ru", "index.html"), injectBase(ruHtml, "../"));

// Английская версия (граф)
let enHtml = fs.readFileSync(path.join(ROOT, "arkham-graph-clean-en.html"), "utf8");
fs.writeFileSync(path.join(OUT, "en", "index.html"), injectBase(enHtml, "../"));

// Ассеты (папка с пробелами в имени)
const assetsSrc = path.join(ROOT, ASSETS_DIR);
const assetsDest = path.join(OUT, ASSETS_DIR);
if (fs.existsSync(assetsSrc)) {
  copyDir(assetsSrc, assetsDest);
  console.log("Скопирована папка " + ASSETS_DIR);
}

console.log("Готово: папка docs/ создана для GitHub Pages.");
console.log("Дальше: Settings → Pages → Branch: main, folder: /docs → Save.");
