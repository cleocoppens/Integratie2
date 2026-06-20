export function initCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach(setupCarousel);
  window.addEventListener("resize", onWindowResize);
}

function setupCarousel(carousel) {
  const track    = carousel.querySelector("[data-carousel-track]");
  const controls = carousel.querySelector("[data-carousel-controls]");
  const prev     = carousel.querySelector("[data-carousel-prev]");
  const next     = carousel.querySelector("[data-carousel-next]");
  if (!track || !controls || !prev || !next) return;

  prev.addEventListener("click", onPrevClick);
  next.addEventListener("click", onNextClick);
  track.addEventListener("scroll", onTrackScroll);
  refreshCarousel(carousel);
}

function onPrevClick(event) {
  const track = findTrack(event.currentTarget);
  if (track) moveCarousel(track, -1);
}

function onNextClick(event) {
  const track = findTrack(event.currentTarget);
  if (track) moveCarousel(track, 1);
}

function onTrackScroll(event) {
  refreshCarousel(event.currentTarget.closest("[data-carousel]"));
}

function onWindowResize() {
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach(refreshCarousel);
}

function findTrack(button) {
  const carousel = button.closest("[data-carousel]");
  return carousel ? carousel.querySelector("[data-carousel-track]") : null;
}

function refreshCarousel(carousel) {
  if (!carousel) return;
  const track    = carousel.querySelector("[data-carousel-track]");
  const controls = carousel.querySelector("[data-carousel-controls]");
  const prev     = carousel.querySelector("[data-carousel-prev]");
  const next     = carousel.querySelector("[data-carousel-next]");
  if (!track || !controls || !prev || !next) return;
  updateControls(track, controls, prev, next);
}

function moveCarousel(track, direction) {
  track.scrollBy({ left: stepSize(track) * direction, behavior: "smooth" });
}

function stepSize(track) {
  const first = track.firstElementChild;
  if (!first) return track.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return first.getBoundingClientRect().width + gap;
}

function updateControls(track, controls, prev, next) {
  const overflow = track.scrollWidth - track.clientWidth;
  controls.hidden = overflow <= 1;
  setDisabled(prev, track.scrollLeft <= 0);
  setDisabled(next, track.scrollLeft >= overflow - 1);
}

function setDisabled(button, disabled) {
  button.disabled = disabled;
  button.setAttribute("aria-disabled", String(disabled));
}
