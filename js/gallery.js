import { refreshAll } from "./carousel.js";

const MAX_VISIBLE = 10;

export async function initGalleryUpload() {
  await loadFromAPI();

  const uploadItem = document.querySelector("[data-gallery-upload]");
  if (!uploadItem) return;

  const fileInput = uploadItem.querySelector("[data-gallery-input]");
  fileInput.addEventListener("change", handleFileChange);
}

async function handleFileChange(event) {
  const fileInput  = event.currentTarget;
  const uploadItem = fileInput.closest("[data-gallery-upload]");
  const track      = uploadItem.closest("[data-carousel-track]");
  const label      = uploadItem.querySelector("[data-gallery-label]");
  const errorEl    = uploadItem.querySelector("[data-gallery-error]");
  const file       = fileInput.files[0];
  if (!file) return;

  hideGalleryError(errorEl);
  setGalleryLabel(label, "Uploaden…");

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res  = await fetch("upload.php", { method: "POST", body: formData });
    const data = await res.json();

    if (data.success) {
      prependPhoto(uploadItem, data.id, data.alt);
      enforceLimit(track);
      refreshAll();
    } else {
      showGalleryError(errorEl, friendlyError(data.error));
    }
  } catch {
    showGalleryError(errorEl, "Upload mislukt. Probeer opnieuw.");
  } finally {
    setGalleryLabel(label, "Voeg jouw foto toe");
    fileInput.value = "";
  }
}

function setGalleryLabel(label, text) {
  label.textContent = text;
}

function showGalleryError(errorEl, msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function hideGalleryError(errorEl) {
  errorEl.hidden = true;
}

async function loadFromAPI() {
  const uploadItem = document.querySelector("[data-gallery-upload]");
  if (!uploadItem) return;
  const track = uploadItem.closest("[data-carousel-track]");

  try {
    const res    = await fetch("api/gallery.php");
    const photos = await res.json();
    if (!Array.isArray(photos) || photos.length === 0) return;

    [...photos].reverse().forEach(p => prependPhoto(uploadItem, p.id, p.alt));

    const placeholders = Array.from(track.querySelectorAll(".gallery__item--empty"));
    placeholders.slice(-photos.length).forEach(p => p.remove());
    track.scrollLeft = 0;
    requestAnimationFrame(refreshAll);
  } catch {
    // stil falen — placeholders blijven zichtbaar
  }
}

function prependPhoto(uploadItem, id, alt) {
  const li  = document.createElement("li");
  li.className = "gallery__item";
  const img = document.createElement("img");
  img.className = "gallery__img";
  img.src       = "api/photo.php?id=" + id;
  img.alt       = alt;
  img.width     = 280;
  img.height    = 340;
  img.loading   = "lazy";
  li.appendChild(img);
  uploadItem.after(li);
}

function enforceLimit(track) {
  const placeholders = track.querySelectorAll(".gallery__item--empty");
  if (placeholders.length > 0) {
    placeholders[placeholders.length - 1].remove();
    return;
  }
  const photos = track.querySelectorAll(
    ".gallery__item:not(.gallery__item--upload):not(.gallery__item--empty)"
  );
  if (photos.length > MAX_VISIBLE) photos[photos.length - 1].remove();
}

function friendlyError(code) {
  const msgs = {
    toobig: "Bestand is te groot (max 10 MB).",
    type:   "Alleen jpg, png, webp of gif toegestaan.",
    upload: "Upload mislukt. Probeer opnieuw.",
  };
  return msgs[code] ?? "Upload mislukt. Probeer opnieuw.";
}
