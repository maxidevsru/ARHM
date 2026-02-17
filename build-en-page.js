const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "arkham-graph-clean.html");
const dest = path.join(__dirname, "arkham-graph-clean-en.html");

let html = fs.readFileSync(src, "utf8");

const replacements = [
  [
    "Мы только пришли к этому, поэтому будем дальше проводить своё расследование — если это окажется интересным для людей. И будем стараться для вас.",
    "We've only just arrived at this, so we'll continue our investigation — if it turns out to be interesting. We'll do our best for you."
  ],
  ["Поддержать нас можно по криптокошельку BTC:", "You can support us via BTC wallet:"],
  ['title="Копировать адрес"', 'title="Copy address"'],
  [">Копировать</button>", ">Copy</button>"],
  ['title="Нажмите, чтобы скопировать"', 'title="Click to copy"'],
  ["[ваш BTC-адрес]", "[your BTC address]"],
  ["Скопировано!", "Copied!"],
  ["При поддержке проекта НМШ", "Supported by NMSH project"],
  ["Подписаться на криптоджунгли", "Subscribe to Crypto Jungle"]
];

for (const [ru, en] of replacements) {
  html = html.split(ru).join(en);
}

fs.writeFileSync(dest, html);
console.log("Created arkham-graph-clean-en.html");
