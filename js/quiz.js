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

let _steps   = [];
let _current = 0;
let _btn     = null;

export function initQuiz() {
  const form = document.querySelector("[data-quiz]");
  if (!form) return;
  _steps   = Array.from(form.querySelectorAll("[data-quiz-step]"));
  _btn     = form.querySelector("[data-quiz-next]");
  _current = 0;
  _btn.disabled = true;
  setupStepListeners(_steps[_current], _current);
  _btn.addEventListener("click", handleQuizNext);
}

function handleQuizNext() {
  const step   = _steps[_current];
  const name   = `q${_current + 1}`;
  const picked = step.querySelector(`input[name="${name}"]:checked`);
  if (!picked) return;
  step.hidden = true;
  _current++;
  if (_current >= _steps.length) {
    showResult(_btn.closest("[data-quiz]"), calcType(_steps));
  } else {
    _steps[_current].hidden = false;
    _btn.disabled = true;
    setupStepListeners(_steps[_current], _current);
    if (_current === _steps.length - 1) _btn.textContent = "Bekijk mijn type";
  }
}

function enableNextBtn() {
  _btn.disabled = false;
}

function setupStepListeners(step, index) {
  step.querySelectorAll(`input[name="q${index + 1}"]`).forEach(attachRadioListener);
}

function attachRadioListener(radio) {
  radio.addEventListener("change", enableNextBtn);
}

function calcType(steps) {
  const scores = { G: 0, S: 0, D: 0, C: 0 };
  steps.forEach((step, i) => {
    const val = step.querySelector(`input[name="q${i + 1}"]:checked`)?.value;
    if (val in scores) scores[val]++;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function handleRetry() {
  location.reload();
}

function showResult(form, typeKey) {
  const type = TYPES[typeKey];
  _btn.hidden = true;

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
  result.querySelector(".quiz-card__retry").addEventListener("click", handleRetry);

  form.appendChild(result);
}
