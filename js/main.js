// main.js — enige entry. Wordt als module na de HTML geladen,
// dus geen DOMContentLoaded nodig.
import { initTypewriter } from "./typewriter.js";
import { initCarousels } from "./carousel.js";
import { initCounter } from "./counter.js";
import { initQuiz } from "./quiz.js";
import { initConfessions } from "./confessions.js";
import { initFormValidation } from "./validation.js";
import { initGalleryUpload } from "./gallery.js";
import { initReviews } from "./reviews.js";
import { initScrollAnimations } from "./animations.js";

function toggleTasReveal(e) {
  e.currentTarget.classList.toggle("is-revealed");
}

initTypewriter();
initCarousels();
initCounter();
initQuiz();
initFormValidation();
initScrollAnimations();
document.querySelector(".deco--tas-confessions")?.addEventListener("click", toggleTasReveal);
await initConfessions();
await initGalleryUpload();
await initReviews();
