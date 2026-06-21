const CHAR_MS = 55;

export function initTypewriter() {
  const lines = document.querySelectorAll(".hero__line");
  if (!lines.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lines.forEach(l => { l.style.clipPath = "inset(0 100% 0 0)"; });

  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const line = lines[i++];
    const len  = Math.max(1, line.textContent.trim().length);
    const dur  = (len * CHAR_MS / 1000).toFixed(2);
    line.style.animation = `type-line ${dur}s steps(${len}, end) forwards`;
    setTimeout(next, Number(dur) * 1000 + 100);
  }
  setTimeout(next, 200);
}
