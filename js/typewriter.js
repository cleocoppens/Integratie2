const CHAR_MS = 55;

export function initTypewriter() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const lines = Array.from(document.querySelectorAll(".hero__line"));
  if (!lines.length) return;
  lines.forEach(hideHeroLine);
  setTimeout(() => typeNextLine(lines, 0), 200);
}

function hideHeroLine(line) {
  line.style.clipPath = "inset(0 100% 0 0)";
}

function typeNextLine(lines, i) {
  if (i >= lines.length) return;
  const line = lines[i];
  const len  = Math.max(1, line.textContent.trim().length);
  const dur  = (len * CHAR_MS / 1000).toFixed(2);
  line.style.animation = `type-line ${dur}s steps(${len}, end) forwards`;
  setTimeout(() => typeNextLine(lines, i + 1), Number(dur) * 1000 + 100);
}
