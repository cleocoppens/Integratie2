const INTERVAL_MS = 5000;
const MIN = 10;
const MAX = 200;

export function initCounter() {
  const nodes    = document.querySelectorAll("[data-counter]");
  const tagNodes = document.querySelectorAll("[data-tag-count]");
  if (!nodes.length) return;

  let current = randomBetween(MIN, MAX);
  update(nodes, tagNodes, current);

  window.setInterval(() => {
    current = fluctuate(current);
    update(nodes, tagNodes, current);
  }, INTERVAL_MS);
}

function update(nodes, tagNodes, total) {
  nodes.forEach(n => writeCount(n, total));
  if (tagNodes.length) {
    distribute(total, tagNodes.length).forEach((v, i) => writeCount(tagNodes[i], v));
  }
}

function distribute(total, n) {
  const weights = Array.from({ length: n }, () => Math.random() + 0.2);
  const sum     = weights.reduce((a, b) => a + b, 0);
  const values  = weights.map(w => Math.max(1, Math.round(w / sum * total)));
  // afrondingsverschil corrigeren op de eerste waarde
  values[0] += total - values.reduce((a, b) => a + b, 0);
  return values;
}

function fluctuate(current) {
  const delta = Math.floor(Math.random() * 11) - 5; // -5 .. +5
  return Math.min(MAX, Math.max(MIN, current + delta));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function writeCount(node, value) {
  node.textContent = String(value);
}
