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

initTypewriter();
initCarousels();
document.querySelector(".deco--tas-confessions")
  ?.addEventListener("click", e => e.currentTarget.classList.toggle("is-revealed"));
initCounter();
initQuiz();
initFormValidation();
initScrollAnimations();
await initConfessions();
await initGalleryUpload();
await initReviews();
