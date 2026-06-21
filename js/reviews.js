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

function initReviewForm(track) {
  const form = track.querySelector("[data-review-form]");
  if (!form) return;

  const starsGroup  = form.querySelector("[role='group']");
  const starsInput  = form.querySelector("[data-stars-value]");
  const textarea    = form.querySelector(".review-form__text");
  const charCount   = form.querySelector("[data-review-char-count]");
  const locationSel = form.querySelector(".review-form__location");
  const authorInput = form.querySelector("[data-author-field]");
  const anonToggle  = form.querySelector("[data-anon-toggle]");
  const cityArrow   = form.querySelector(".review-form__city-arrow");
  const submitBtn   = form.querySelector(".review-form__submit");
  let selectedStars = 0;

  starsGroup.querySelectorAll("[data-star]").forEach(btn => {
    const n = Number(btn.dataset.star);
    btn.addEventListener("mouseenter", () => highlightStars(starsGroup, n, true));
    btn.addEventListener("mouseleave", () => highlightStars(starsGroup, selectedStars, false));
    btn.addEventListener("click", () => {
      selectedStars = n;
      starsInput.value = n;
      highlightStars(starsGroup, n, false);
      checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput);
    });
  });

  cityArrow?.addEventListener("click", () => {
    try { locationSel.showPicker(); } catch { locationSel.focus(); }
  });

  anonToggle.addEventListener("change", () => {
    authorInput.hidden   = anonToggle.checked;
    authorInput.disabled = anonToggle.checked;
    checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput);
  });

  const MAX_CHARS = Number(textarea.maxLength) || 150;
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    charCount.textContent = String(len);
    charCount.closest(".review-form__count").classList.toggle("is-near-limit", len >= MAX_CHARS - 10);
    checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput);
  });
  locationSel.addEventListener("change", () => checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput));
  authorInput.addEventListener("input",  () => checkReviewReady(submitBtn, selectedStars, textarea, locationSel, anonToggle, authorInput));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res  = await fetch("api/add-review.php", { method: "POST", body: new FormData(form) });
      const json = await res.json();
      if (!json.success) return;
      prependReview(track, json);
      form.reset();
      selectedStars = 0;
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
  });
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
