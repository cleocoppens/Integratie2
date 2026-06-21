const MAX_REVIEWS = 15;

let reviewForm      = null;
let starsGroup      = null;
let starsInput      = null;
let reviewTextarea  = null;
let reviewCharCount = null;
let locationSel     = null;
let authorInput     = null;
let anonToggle      = null;
let reviewSubmitBtn = null;
let selectedStars   = 0;

export async function initReviews() {
  const track = document.querySelector("[data-reviews-track]");
  if (!track) return;
  await loadFromAPI(track);
  initReviewForm(track);
  window.dispatchEvent(new Event("resize"));
}

async function loadFromAPI(track) {
  try {
    const res     = await fetch("api/reviews.php");
    const reviews = await res.json();
    if (!Array.isArray(reviews) || reviews.length === 0) return;
    const formItem = track.querySelector(".review--form");
    [...reviews].reverse().forEach(r => formItem.insertAdjacentElement("afterend", buildReviewItem(r)));
  } catch {
    // stil falen
  }
}

function buildReviewItem({ author, location, stars, quote }) {
  const li = document.createElement("li");
  li.className = "review";
  li.innerHTML =
    `<p class="review__stars" aria-label="${stars} op 5 sterren">${buildStarHTML(stars)}</p>` +
    `<blockquote class="review__quote"></blockquote>` +
    `<cite class="review__author"></cite>`;
  li.querySelector(".review__quote").textContent  = quote;
  li.querySelector(".review__author").textContent = `${author}, ${location}`;
  return li;
}

function buildStarHTML(count) {
  return Array.from({ length: 5 }, (_, i) => (i < count ? "★" : "☆")).join("");
}

function checkReviewReady() {
  reviewSubmitBtn.disabled = !(
    selectedStars > 0 &&
    reviewTextarea.value.trim().length > 0 &&
    locationSel.value !== "" &&
    (anonToggle.checked || authorInput.value.trim().length > 0)
  );
}

function onStarEnter(event) {
  highlightStars(starsGroup, Number(event.currentTarget.dataset.star), true);
}

function onStarLeave() {
  highlightStars(starsGroup, Number(starsInput.value), false);
}

function onStarClick(event) {
  selectedStars    = Number(event.currentTarget.dataset.star);
  starsInput.value = selectedStars;
  highlightStars(starsGroup, selectedStars, false);
  checkReviewReady();
}

function setupStarButton(btn) {
  btn.addEventListener("mouseenter", onStarEnter);
  btn.addEventListener("mouseleave", onStarLeave);
  btn.addEventListener("click",      onStarClick);
}

function onCityArrowClick() {
  try { locationSel.showPicker(); } catch { locationSel.focus(); }
}

function onAnonToggleChange() {
  authorInput.hidden   = anonToggle.checked;
  authorInput.disabled = anonToggle.checked;
  checkReviewReady();
}

function onReviewTextareaInput() {
  const MAX_CHARS = Number(reviewTextarea.maxLength) || 150;
  const len       = reviewTextarea.value.length;
  reviewCharCount.textContent = String(len);
  reviewCharCount.closest(".review-form__count")
    .classList.toggle("is-near-limit", len >= MAX_CHARS - 10);
  checkReviewReady();
}

function initReviewForm(track) {
  reviewForm = track.querySelector("[data-review-form]");
  if (!reviewForm) return;

  starsGroup      = reviewForm.querySelector("[role='group']");
  starsInput      = reviewForm.querySelector("[data-stars-value]");
  reviewTextarea  = reviewForm.querySelector(".review-form__text");
  reviewCharCount = reviewForm.querySelector("[data-review-char-count]");
  locationSel     = reviewForm.querySelector(".review-form__location");
  authorInput     = reviewForm.querySelector("[data-author-field]");
  anonToggle      = reviewForm.querySelector("[data-anon-toggle]");
  reviewSubmitBtn = reviewForm.querySelector(".review-form__submit");
  selectedStars   = 0;

  const cityArrow = reviewForm.querySelector(".review-form__city-arrow");
  starsGroup.querySelectorAll("[data-star]").forEach(setupStarButton);
  cityArrow?.addEventListener("click",     onCityArrowClick);
  anonToggle.addEventListener("change",    onAnonToggleChange);
  reviewTextarea.addEventListener("input", onReviewTextareaInput);
  locationSel.addEventListener("change",  checkReviewReady);
  authorInput.addEventListener("input",   checkReviewReady);
  reviewForm.addEventListener("submit",   handleReviewSubmit);
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  const form  = e.currentTarget;
  const track = form.closest("[data-reviews-track]");

  try {
    const res  = await fetch("api/add-review.php", { method: "POST", body: new FormData(form) });
    const json = await res.json();
    if (!json.success) return;
    prependReview(track, json);
    form.reset();
    starsInput.value            = 0;
    reviewCharCount.textContent = "0";
    selectedStars               = 0;
    highlightStars(starsGroup, 0, false);
    authorInput.hidden   = false;
    authorInput.disabled = false;
    reviewSubmitBtn.disabled = true;
    window.dispatchEvent(new Event("resize"));
  } catch {
    // stil falen
  }
}

function prependReview(track, data) {
  const formItem = track.querySelector(".review--form");
  formItem.insertAdjacentElement("afterend", buildReviewItem(data));
  const items = track.querySelectorAll(".review:not(.review--form)");
  if (items.length > MAX_REVIEWS) items[items.length - 1].remove();
}

function highlightStars(group, count, isHover) {
  group.querySelectorAll("[data-star]").forEach(btn => {
    const n = Number(btn.dataset.star);
    btn.classList.toggle("is-active", !isHover && n <= count);
    btn.classList.toggle("is-hover",   isHover && n <= count);
  });
}
