// main.js — enige entry. Wordt als module na de HTML geladen,
// dus geen DOMContentLoaded nodig.
import { initCarousels } from "./carousel.js";
import { initCounter } from "./counter.js";
import { initQuiz } from "./quiz.js";
import { initConfessions } from "./confessions.js";
import { initFormValidation } from "./validation.js";

initCarousels();
initCounter();
initQuiz();
initConfessions();
initFormValidation();
