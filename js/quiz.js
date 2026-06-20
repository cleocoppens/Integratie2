// quiz.js — verbetert het quizformulier: zonder JS post het naar quiz.php,
// met JS tonen we meteen het resultaat zonder herladen.

const TYPES = {
  koffie:  { name: "De Barista", line: "Jouw ochtend begint pas echt bij de eerste kop." },
  plannen: { name: "De Planner", line: "Jij zet de toon voor heel het team, nog voor 8u." },
  staren:  { name: "De Dromer",  line: "Even het raam, even de stilte — dan ben je klaar." },
  stilte:  { name: "De Monnik",  line: "Niemand stoort, alles klopt. Dit is jouw uur." },
};

export function initQuiz() {
  const form = document.querySelector("[data-quiz]");
  if (!form) return;
  form.addEventListener("submit", handleQuizSubmit);
}

function handleQuizSubmit(event) {
  const form = event.currentTarget;
  const choice = readChoice(form);
  if (!choice) return; // laat de native required-melding het werk doen
  event.preventDefault();
  showResult(form, choice);
}

function readChoice(form) {
  const selected = form.querySelector("input[name='q1']:checked");
  return selected ? selected.value : "";
}

function showResult(form, choice) {
  const type = TYPES[choice];
  if (!type) return;

  const result = document.createElement("div");
  result.className = "quiz-card__result";
  result.innerHTML =
    `<p class="quiz-card__hint">Jouw early type is</p>` +
    `<p class="quiz-card__question">${type.name}</p>` +
    `<p class="quiz-card__hint">${type.line}</p>`;

  form.replaceChildren(result);
}
