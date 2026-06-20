// main.js — enige entry. Wordt als module na de HTML geladen,
// dus geen DOMContentLoaded nodig.
import { initCarousels } from "./carousel.js";
import { initCounter } from "./counter.js";
import { initQuiz } from "./quiz.js";
import { initConfessions } from "./confessions.js";
import { initFormValidation } from "./validation.js";
import { initGalleryUpload } from "./gallery.js";
import { initReviews } from "./reviews.js";

initCarousels();
initCounter();
initQuiz();
initFormValidation();
await initConfessions();
await initGalleryUpload();
await initReviews();
