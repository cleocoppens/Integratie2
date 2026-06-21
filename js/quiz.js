const TYPES = {
  G: {
    name: "De Genieter",
    label: "Jij geniet van de stilte",
    line: "Jij komt vroeg voor de rust. Die eerste uren zijn van jou alleen — en dat koester je als geen ander.",
  },
  S: {
    name: "De Strateeg",
    label: "Jij hebt alles al uitgedacht",
    line: "Voor de rest aankomt, heb jij al je dag gepland. Jij zet de toon — zonder dat iemand het doorheeft.",
  },
  D: {
    name: "De Doener",
    label: "Jij scoort punten voor de rest wakker is",
    line: "Vroeg = productief. Als de rest binnenloopt, heb jij al meer gedaan dan de meesten in een halve dag.",
  },
  C: {
    name: "De Connector",
    label: "Jij maakt het kantoor warm",
    line: "Jij bent de spil van het kantoor. Zelfs voor 8u zoek je verbinding — en iedereen is er blij mee.",
  },
};

let quizForm    = null;
let quizSteps   = null;
let quizBtn     = null;
let quizCurrent = 0;

export function initQuiz() {
  quizForm = document.querySelector("[data-quiz]");
  if (!quizForm) return;
  quizSteps = Array.from(quizForm.querySelectorAll("[data-quiz-step]"));
  quizBtn   = quizForm.querySelector("[data-quiz-next]");
  startQuiz();
}

function startQuiz() {
  quizCurrent = 0;
  quizSteps.forEach(resetStep);
  quizBtn.hidden      = false;
  quizBtn.disabled    = true;
  quizBtn.textContent = "Volgende vraag";
  setupStepListeners(0);
  quizBtn.addEventListener("click", onNext);
}

function resetStep(step, index) {
  step.hidden = index !== 0;
  step.querySelectorAll("input[type=radio]").forEach(clearRadio);
}

function clearRadio(radio) {
  radio.checked = false;
}

function onNext() {
  const step   = quizSteps[quizCurrent];
  const picked = step.querySelector(`input[name="q${quizCurrent + 1}"]:checked`);
  if (!picked) return;

  step.hidden = true;
  quizCurrent++;

  if (quizCurrent >= quizSteps.length) {
    quizBtn.removeEventListener("click", onNext);
    showResult();
  } else {
    quizSteps[quizCurrent].hidden = false;
    quizBtn.disabled = true;
    setupStepListeners(quizCurrent);
    if (quizCurrent === quizSteps.length - 1) quizBtn.textContent = "Bekijk mijn type";
  }
}

function setupStepListeners(index) {
  const radios = quizSteps[index].querySelectorAll(`input[name="q${index + 1}"]`);
  radios.forEach(addRadioListener);
}

function addRadioListener(radio) {
  radio.addEventListener("change", onRadioChange);
}

function onRadioChange() {
  quizBtn.disabled = false;
}

function calcType() {
  const scores = { G: 0, S: 0, D: 0, C: 0 };
  quizSteps.forEach((step, i) => {
    const val = step.querySelector(`input[name="q${i + 1}"]:checked`)?.value;
    if (val in scores) scores[val]++;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function showResult() {
  const type = TYPES[calcType()];
  quizBtn.hidden = true;

  const result = document.createElement("div");
  result.className = "quiz-card__result";
  result.innerHTML =
    `<p class="quiz-card__progress">Jouw early type</p>` +
    `<p class="quiz-card__result-name"></p>` +
    `<p class="quiz-card__result-label"></p>` +
    `<p class="quiz-card__hint quiz-card__result-line"></p>` +
    `<button class="button button--ghost quiz-card__retry" type="button">Opnieuw proberen</button>`;

  result.querySelector(".quiz-card__result-name").textContent  = type.name;
  result.querySelector(".quiz-card__result-label").textContent = type.label;
  result.querySelector(".quiz-card__result-line").textContent  = type.line;
  result.querySelector(".quiz-card__retry").addEventListener("click", onRetry);

  quizForm.appendChild(result);
}

function onRetry(event) {
  event.currentTarget.closest(".quiz-card__result").remove();
  startQuiz();
}
