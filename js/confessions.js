export async function initConfessions() {
  await loadFromAPI();
  initRecogniseButtons();
  initFeedControls();
  initConfessionForm();
}

async function loadFromAPI() {
  const list = document.querySelector("[data-feed]");
  if (!list) return;

  try {
    const res         = await fetch("api/confessions.php");
    const confessions = await res.json();
    if (!Array.isArray(confessions) || confessions.length === 0) return;

    [...confessions].reverse().forEach(c => {
      list.prepend(buildConfessionFromData(c.meta, c.text, c.recognition_count, c.id));
    });
  } catch {
    // stil falen — fallback in HTML blijft zichtbaar
  }
}

function buildConfessionFromData(meta, text, count, id) {
  const item = document.createElement("li");
  item.className = "confession";
  if (id) item.dataset.confessionId = id;
  item.innerHTML =
    `<span class="confession__meta"></span>` +
    `<p class="confession__text"></p>` +
    `<button class="confession__recognise" type="button">` +
    `<span aria-hidden="true">&check;</span> <span data-recognise-count>${count}</span></button>`;
  item.querySelector(".confession__meta").textContent = meta;
  item.querySelector(".confession__text").textContent = text;
  item.querySelector(".confession__recognise").addEventListener("click", onRecogniseClick);
  return item;
}

function feedStepSize(list) {
  const first = list.querySelector(".confession");
  if (!first) return 80;
  const gap = Number.parseFloat(getComputedStyle(list).rowGap) || 0;
  return first.getBoundingClientRect().height + gap;
}

function refreshFeedControls(list, controls, prev, next) {
  const overflow = list.scrollHeight - list.clientHeight;
  controls.hidden = overflow <= 1;
  prev.disabled = list.scrollTop <= 0;
  prev.setAttribute("aria-disabled", String(list.scrollTop <= 0));
  next.disabled = list.scrollTop >= overflow - 1;
  next.setAttribute("aria-disabled", String(list.scrollTop >= overflow - 1));
}

function initFeedControls() {
  const list     = document.querySelector("[data-feed]");
  const controls = document.querySelector("[data-feed-controls]");
  const prev     = document.querySelector("[data-feed-prev]");
  const next     = document.querySelector("[data-feed-next]");
  if (!list || !controls || !prev || !next) return;

  prev.addEventListener("click", () => { list.scrollBy({ top: -feedStepSize(list), behavior: "smooth" }); });
  next.addEventListener("click", () => { list.scrollBy({ top:  feedStepSize(list), behavior: "smooth" }); });
  list.addEventListener("scroll", () => refreshFeedControls(list, controls, prev, next));
  refreshFeedControls(list, controls, prev, next);
}

function initRecogniseButtons() {
  document.querySelectorAll(".confession__recognise").forEach(setupRecogniseButton);
}

function setupRecogniseButton(button) {
  button.addEventListener("click", onRecogniseClick);
}

function onRecogniseClick(event) {
  toggleRecognise(event.currentTarget);
}

function toggleRecognise(button) {
  const counter = button.querySelector("[data-recognise-count]");
  if (!counter) return;
  const active  = button.classList.toggle("is-active");
  const delta   = active ? 1 : -1;
  const current = Number.parseInt(counter.textContent, 10) || 0;
  counter.textContent = String(Math.max(0, current + delta));

  const id = button.closest("[data-confession-id]")?.dataset.confessionId;
  if (id) saveRecognise(id, delta);
}

async function saveRecognise(id, delta) {
  const data = new FormData();
  data.append("id", id);
  data.append("delta", delta);
  try {
    await fetch("api/recognise.php", { method: "POST", body: data });
  } catch {
    // stil falen — teller staat al bijgewerkt in de DOM
  }
}

function checkConfessionReady(button, input, locInput, counter, MAX) {
  const len = input.value.length;
  if (counter) {
    counter.textContent = `${len}/${MAX}`;
    counter.classList.toggle("is-near-limit", len >= MAX - 10);
  }
  button.disabled = input.value.trim() === "" || locInput.value === "";
}

function initConfessionForm() {
  const form     = document.querySelector(".confession-form");
  if (!form) return;

  const input    = form.querySelector(".confession-form__input");
  const locInput = form.querySelector(".confession-form__location");
  const button   = form.querySelector("[type='submit']");
  const arrow    = form.querySelector(".confession-form__city-arrow");
  const counter  = form.querySelector("[data-confession-count]");
  const MAX      = Number(input.maxLength) || 100;

  arrow?.addEventListener("click", () => {
    try { locInput.showPicker(); } catch { locInput.focus(); }
  });

  input.addEventListener("input",   () => checkConfessionReady(button, input, locInput, counter, MAX));
  locInput.addEventListener("change", () => checkConfessionReady(button, input, locInput, counter, MAX));

  form.addEventListener("submit", handleConfessionSubmit);
}

function handleConfessionSubmit(event) {
  const form     = event.currentTarget;
  const input    = form.querySelector(".confession-form__input");
  const locInput = form.querySelector(".confession-form__location");
  const text     = input.value.trim();
  const location = locInput ? locInput.value.trim() : "";
  if (text === "" || location === "") return;
  event.preventDefault();
  const list = document.querySelector("[data-feed]");
  if (!list) return;
  list.prepend(buildConfession(text, location));
  saveConfession(form.action, text, location);
  form.reset();
  input.focus();
}

async function saveConfession(url, text, location) {
  const data = new FormData();
  data.append("moment", text);
  data.append("location", location);
  try {
    await fetch(url, { method: "POST", body: data });
  } catch {
    // stil falen — bericht staat al in de DOM
  }
}

function buildConfession(text, location) {
  const item = document.createElement("li");
  item.className = "confession";
  item.innerHTML =
    `<span class="confession__meta"></span>` +
    `<p class="confession__text"></p>` +
    `<button class="confession__recognise" type="button">` +
    `<span aria-hidden="true">&check;</span> <span data-recognise-count>0</span></button>`;
  item.querySelector(".confession__meta").textContent = `${formatNow()} · ${location}`;
  item.querySelector(".confession__text").textContent = text;
  item.querySelector(".confession__recognise").addEventListener("click", onRecogniseClick);
  return item;
}

function formatNow() {
  const now     = new Date();
  const hours   = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}u${minutes}`;
}
