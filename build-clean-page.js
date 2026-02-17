const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "Intel Platform _ Arkham.html");
const outPath = path.join(__dirname, "arkham-graph-clean.html");
const assetsDir = "Intel Platform _ Arkham_files";

const html = fs.readFileSync(srcPath, "utf8");
const traceIdx = html.indexOf("traceContainer");
const svgStart = html.indexOf("<svg", traceIdx);
let depth = 0;
let svgEnd = svgStart;
for (let i = svgStart; i < html.length; i++) {
  if (html.slice(i, i + 4) === "<svg") depth++;
  if (html.slice(i, i + 6) === "</svg>") {
    depth--;
    if (depth === 0) {
      svgEnd = i + 6;
      break;
    }
  }
}
const svgContent = html.slice(svgStart, svgEnd);

const cleanHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Arkham Graph</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #0d1117; }
    .graph-page { position: relative; width: 100%; height: 100%; }
    #arkham-background { position: fixed; inset: 0; z-index: 0; pointer-events: none; display: flex; align-items: center; justify-content: center; }
    #arkham-background .bg-logo { position: absolute; width: 320px; height: 320px; opacity: 0.08; top: 24px; left: 24px; }
    #arkham-links-overlay { position: fixed; inset: 0; z-index: 10; pointer-events: none; }
    #arkham-links-overlay .bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: IBM Plex Mono, monospace, sans-serif; font-size: clamp(32px, 8vw, 120px); font-weight: 700; letter-spacing: 0.08em; color: rgba(255,255,255,0.06); text-decoration: none; pointer-events: none; white-space: nowrap; }
    #arkham-links-overlay .nmsh-banner { position: absolute; bottom: 24px; left: 24px; display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #0088cc; border-radius: 10px; text-decoration: none; color: #fff; font-family: IBM Plex Mono, sans-serif; font-size: 14px; pointer-events: auto; border: 1px solid #0077b5; box-shadow: 0 2px 8px rgba(0,136,204,0.4); }
    #arkham-links-overlay .nmsh-banner:hover { background: #0077b5; color: #fff; box-shadow: 0 4px 12px rgba(0,136,204,0.5); }
    #arkham-links-overlay .nmsh-banner svg { flex-shrink: 0; fill: #fff; }
    #arkham-links-overlay .crptjungle-banner { position: absolute; bottom: 72px; left: 24px; display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #0088cc; border-radius: 10px; text-decoration: none; color: #fff; font-family: IBM Plex Mono, sans-serif; font-size: 14px; pointer-events: auto; border: 1px solid #0077b5; box-shadow: 0 2px 8px rgba(0,136,204,0.4); }
    #arkham-links-overlay .crptjungle-banner:hover { background: #0077b5; color: #fff; box-shadow: 0 4px 12px rgba(0,136,204,0.5); }
    #arkham-links-overlay .crptjungle-banner svg { flex-shrink: 0; fill: #fff; }
    #arkham-links-overlay .about-block { position: absolute; top: 24px; right: 24px; max-width: 320px; font-family: IBM Plex Mono, sans-serif; font-size: 13px; line-height: 1.5; color: #fff; pointer-events: none; text-align: left; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
    #arkham-links-overlay .about-block span { font-size: 12px; word-break: break-all; }
    #arkham-links-overlay .btc-address { cursor: pointer; pointer-events: auto; text-decoration: underline; user-select: text; }
    #arkham-links-overlay .btc-address:hover { opacity: 0.9; }
    #arkham-links-overlay .btc-copy-btn { pointer-events: auto; cursor: pointer; margin-top: 4px; padding: 4px 8px; font-size: 11px; font-family: IBM Plex Mono, sans-serif; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 6px; color: #fff; }
    #arkham-links-overlay .btc-copy-btn:hover { background: rgba(255,255,255,0.3); }
    .graph-wrap { position: relative; z-index: 1; width: 100%; height: 100%; }
    .graph-wrap svg { display: block; width: 100%; height: 100%; }
    .Graph-module__XGBWpq__rectWithWhiteBorder { stroke: var(--grayish-white); stroke-width: 0.5px; }
    .Graph-module__XGBWpq__rectWithWhiteBorder:hover { stroke-width: 0.75px; }
    .Graph-module__XGBWpq__rectWithPurpleBorder { stroke: var(--filter); stroke-width: 0.75px; }
    .Graph-module__XGBWpq__rectWithPurpleBorder:hover { stroke-width: 1px; }
  </style>
</head>
<body>
  <div class="graph-page">
    <div id="arkham-background">
      <img class="bg-logo" src="${assetsDir}/logo_watermark_2.svg" alt="Logo">
    </div>
    <div id="arkham-links-overlay">
      <a class="bg-text" href="https://t.me/crptjungle" target="_blank" rel="noopener noreferrer">t.me/crptjungle</a>
      <a class="nmsh-banner" href="https://t.me/nmshhub" target="_blank" rel="noopener noreferrer">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        <span>При поддержке проекта НМШ</span>
      </a>
      <a class="crptjungle-banner" href="https://t.me/crptjungle" target="_blank" rel="noopener noreferrer">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        <span>Подписаться на криптоджунгли</span>
      </a>
      <div class="about-block">
        Мы только пришли к этому, поэтому будем дальше проводить своё расследование — если это окажется интересным для людей. И будем стараться для вас.<br><br>
        Поддержать нас можно по криптокошельку BTC: <button type="button" class="btc-copy-btn" title="Копировать адрес">Копировать</button><br>
        <span class="btc-address" title="Нажмите, чтобы скопировать">[ваш BTC-адрес]</span>
      </div>
    </div>
    <div class="graph-wrap">
${svgContent}
    </div>
  </div>
  <script>
(function () {
  try {
    function findMainSvg() {
      var svgs = document.querySelectorAll(".graph-wrap svg");
      return svgs.length ? svgs[0] : null;
    }
    function setupZoomAndPan(svg) {
      if (!svg) return;
      var viewBoxAttr = svg.getAttribute("viewBox");
      var vb;
      if (viewBoxAttr) vb = viewBoxAttr.split(/\\s+/).map(Number);
      if (!vb || vb.length !== 4 || vb.some(isNaN)) {
        try {
          var box = svg.getBBox();
          vb = [box.x, box.y, box.width, box.height];
          svg.setAttribute("viewBox", vb.join(" "));
        } catch (e) { return; }
      }
      var baseX = vb[0], baseY = vb[1], baseW = vb[2], baseH = vb[3];
      var scale = 1, minScale = 0.1, maxScale = 50, offsetX = 0, offsetY = 0;
      svg.style.userSelect = "none";
      svg.style.webkitUserSelect = "none";
      function applyTransform() {
        var w = baseW / scale, h = baseH / scale;
        var cx = baseX + baseW / 2 + offsetX, cy = baseY + baseH / 2 + offsetY;
        var x = cx - w / 2, y = cy - h / 2;
        svg.setAttribute("viewBox", x + " " + y + " " + w + " " + h);
      }
      applyTransform();
      function onWheel(evt) {
        if (!evt || (!evt.ctrlKey && Math.abs(evt.deltaY) < Math.abs(evt.deltaX))) return;
        evt.preventDefault();
        var delta = evt.deltaY || 0, factor = delta > 0 ? 0.9 : 1.1;
        var newScale = scale * factor;
        if (newScale < minScale) newScale = minScale;
        if (newScale > maxScale) newScale = maxScale;
        scale = newScale;
        applyTransform();
      }
      var isPanning = false, lastClientX = 0, lastClientY = 0;
      function clientDeltaToSvg(dx, dy) {
        var rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) return { dxSvg: 0, dySvg: 0 };
        var w = baseW / scale, h = baseH / scale;
        return { dxSvg: dx * (w / rect.width), dySvg: dy * (h / rect.height) };
      }
      function onMouseDown(evt) {
        if (evt.button !== 0) return;
        evt.preventDefault();
        isPanning = true;
        lastClientX = evt.clientX;
        lastClientY = evt.clientY;
      }
      function onMouseMove(evt) {
        if (!isPanning) return;
        var dx = evt.clientX - lastClientX, dy = evt.clientY - lastClientY;
        lastClientX = evt.clientX;
        lastClientY = evt.clientY;
        var d = clientDeltaToSvg(-dx, -dy);
        offsetX += d.dxSvg;
        offsetY += d.dySvg;
        applyTransform();
      }
      function onMouseUp() { isPanning = false; }
      svg.addEventListener("wheel", onWheel, { passive: false });
      svg.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { setupZoomAndPan(findMainSvg()); });
    } else {
      setupZoomAndPan(findMainSvg());
    }
  } catch (e) {
    console.error("Graph script error", e);
  }
})();
  </script>
</body>
</html>
`;

fs.writeFileSync(outPath, cleanHtml, "utf8");
console.log("Written:", outPath, "size:", (cleanHtml.length / 1024 / 1024).toFixed(2), "MB");
