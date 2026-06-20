// confessions.js — twee dingen: het "herken ik"-vinkje en het toevoegen
// van een nieuw moment. Zonder JS post het formulier naar confession.php.

export function initConfessions() {
  initRecogniseButtons();
  initConfessionForm();
}

function initRecogniseButtons() {
  const buttons = document.querySelectorAll(".confession__recognise");
  buttons.forEach(setupRecogniseButton);
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
  const current = Number.parseInt(counter.textContent, 10) || 0;
  counter.textContent = String(active ? current + 1 : current - 1);
}

function initConfessionForm() {
  const form = document.querySelector(".confession-form");
  if (!form) return;
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
    `<span class="confession__meta">${formatNow()} &middot; </span>` +
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
