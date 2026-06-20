// counter.js — houdt de live teller actueel.
// Probeert de PHP-endpoint; lukt dat niet (bv. statische preview),
// dan fluctueert het getal lichtjes zodat het "leeft".

const ENDPOINT = "counter.php";
const INTERVAL_MS = 5000;

export function initCounter() {
  const node = document.querySelector("[data-counter]");
  if (!node) return;

  refreshCounter(node);
  window.setInterval(refreshCounter.bind(null, node), INTERVAL_MS);
}

async function refreshCounter(node) {
  const live = await fetchCount();
  const value = live === null ? fluctuate(readCount(node)) : live;
  writeCount(node, value);
}

async function fetchCount() {
  try {
    const response = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const data = await response.json();
    return Number.isFinite(data.count) ? data.count : null;
  } catch {
    return null;
  }
}

function readCount(node) {
  return Number.parseInt(node.textContent, 10) || 0;
}

function writeCount(node, value) {
  node.textContent = String(value);
}

function fluctuate(current) {
  const delta = Math.floor(Math.random() * 5) - 2; // -2 .. +2
  return Math.max(0, current + delta);
}
