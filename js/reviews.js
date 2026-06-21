const MAX_REVIEWS = 15;

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
    [...reviews].reverse().forEach(r => {
      formItem.insertAdjacentElement("afterend", buildReviewItem(r));
    });
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
  li.querySelector(".review__quote").textContent = quote;
  li.querySelector(".review__author").textContent = `${author}, ${location}`;
  return li;
}

function buildStarHTML(count) {
  return Array.from({ length: 5 }, (_, i) => (i < count ? "★" : "☆")).join("");
}

function checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput) {
  submitBtn.disabled = !(
    selectedStars > 0 &&
    textarea.value.trim().length > 0 &&
    locationSel.value !== "" &&
    (anonToggle.checked || authorInput.value.trim().length > 0)
  );
}

function onStarMouseenter(e) {
  const n     = Number(e.currentTarget.dataset.star);
  const group = e.currentTarget.closest("[role='group']");
  highlightStars(group, n, true);
}

function onStarMouseleave(e) {
  const group      = e.currentTarget.closest("[role='group']");
  const starsInput = group.closest("form")?.querySelector("[data-stars-value]");
  highlightStars(group, Number(starsInput?.value ?? 0), false);
}

function onStarClick(e) {
  const btn         = e.currentTarget;
  const n           = Number(btn.dataset.star);
  const form        = btn.closest("form");
  const group       = btn.closest("[role='group']");
  const starsInput  = form.querySelector("[data-stars-value]");
  const submitBtn   = form.querySelector(".review-form__submit");
  const textarea    = form.querySelector(".review-form__text");
  const locationSel = form.querySelector(".review-form__location");
  const anonToggle  = form.querySelector("[data-anon-toggle]");
  const authorInput = form.querySelector("[data-author-field]");
  starsInput.value = n;
  highlightStars(group, n, false);
  checkReviewReady(submitBtn, n, textarea, locationSel, anonToggle, authorInput);
}

function attachStarListeners(btn) {
  btn.addEventListener("mouseenter", onStarMouseenter);
  btn.addEventListener("mouseleave", onStarMouseleave);
  btn.addEventListener("click",      onStarClick);
}

function onCityArrowClick(e) {
  const form     = e.currentTarget.closest("form");
  const locInput = form?.querySelector(".review-form__location");
  if (!locInput) return;
  try { locInput.showPicker(); } catch { locInput.focus(); }
}

function onAnonToggleChange(e) {
  const form        = e.currentTarget.closest("form");
  const anonToggle  = e.currentTarget;
  const authorInput = form.querySelector("[data-author-field]");
  const submitBtn   = form.querySelector(".review-form__submit");
  const starsInput  = form.querySelector("[data-stars-value]");
  const textarea    = form.querySelector(".review-form__text");
  const locationSel = form.querySelector(".review-form__location");
  authorInput.hidden   = anonToggle.checked;
  authorInput.disabled = anonToggle.checked;
  checkReviewReady(submitBtn, Number(starsInput.value), textarea, locationSel, anonToggle, authorInput);
}

function onTextareaInput(e) {
  const textarea    = e.currentTarget;
  const form        = textarea.closest("form");
  const MAX_CHARS   = Number(textarea.maxLength) || 150;
  const charCount   = form.querySelector("[data-review-char-count]");
  const submitBtn   = form.querySelector(".review-form__submit");
  const starsInput  = form.querySelector("[data-stars-value]");
  const locationSel = form.querySelector(".review-form__location");
  const anonToggle  = form.querySelector("[data-anon-toggle]");
  const authorInput = form.querySelector("[data-author-field]");
  const len = textarea.value.length;
  charCount.textContent = String(len);
  charCount.closest(".review-form__count").classList.toggle("is-near-limit", len >= MAX_CHARS - 10);
  checkReviewReady(submitBtn, Number(starsInput.value), textarea, locationSel, anonToggle, authorInput);
}

function onReviewFieldChange(e) {
  const form        = e.currentTarget.closest("form");
  const submitBtn   = form.querySelector(".review-form__submit");
  const starsInput  = form.querySelector("[data-stars-value]");
  const textarea    = form.querySelector(".review-form__text");
  const locationSel = form.querySelector(".review-form__location");
  const anonToggle  = form.querySelector("[data-anon-toggle]");
  const authorInput = form.querySelector("[data-author-field]");
  checkReviewReady(submitBtn, Number(starsInput.value), textarea, locationSel, anonToggle, authorInput);
}

function initReviewForm(track) {
  const form = track.querySelector("[data-review-form]");
  if (!form) return;

  const starsGroup  = form.querySelector("[role='group']");
  const cityArrow   = form.querySelector(".review-form__city-arrow");
  const anonToggle  = form.querySelector("[data-anon-toggle]");
  const textarea    = form.querySelector(".review-form__text");
  const locationSel = form.querySelector(".review-form__location");
  const authorInput = form.querySelector("[data-author-field]");

  starsGroup.querySelectorAll("[data-star]").forEach(attachStarListeners);
  cityArrow?.addEventListener("click",  onCityArrowClick);
  anonToggle.addEventListener("change", onAnonToggleChange);
  textarea.addEventListener("input",    onTextareaInput);
  locationSel.addEventListener("change", onReviewFieldChange);
  authorInput.addEventListener("input",  onReviewFieldChange);
  form.addEventListener("submit", handleReviewSubmit);
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  const form        = e.currentTarget;
  const track       = form.closest("[data-reviews-track]");
  const starsInput  = form.querySelector("[data-stars-value]");
  const charCount   = form.querySelector("[data-review-char-count]");
  const starsGroup  = form.querySelector("[role='group']");
  const authorInput = form.querySelector("[data-author-field]");
  const submitBtn   = form.querySelector(".review-form__submit");

  try {
    const res  = await fetch("api/add-review.php", { method: "POST", body: new FormData(form) });
    const json = await res.json();
    if (!json.success) return;
    prependReview(track, json);
    form.reset();
    starsInput.value = 0;
    charCount.textContent = "0";
    highlightStars(starsGroup, 0, false);
    authorInput.hidden   = false;
    authorInput.disabled = false;
    submitBtn.disabled   = true;
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
