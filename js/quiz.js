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

export function initQuiz() {
  const form = document.querySelector("[data-quiz]");
  if (!form) return;

  const steps  = Array.from(form.querySelectorAll("[data-quiz-step]"));
  const btn    = form.querySelector("[data-quiz-next]");
  let current  = 0;

  btn.disabled = true;
  setupStepListeners(steps[current], btn, current);

  btn.addEventListener("click", () => {
    const step = steps[current];
    const name = `q${current + 1}`;
    const picked = step.querySelector(`input[name="${name}"]:checked`);
    if (!picked) return;

    step.hidden = true;
    current++;

    if (current >= steps.length) {
      showResult(form, btn, calcType(steps));
    } else {
      steps[current].hidden = false;
      btn.disabled = true;
      setupStepListeners(steps[current], btn, current);
      if (current === steps.length - 1) btn.textContent = "Bekijk mijn type";
    }
  });
}

function setupStepListeners(step, btn, index) {
  step.querySelectorAll(`input[name="q${index + 1}"]`).forEach(radio => {
    radio.addEventListener("change", () => { btn.disabled = false; });
  });
}

function calcType(steps) {
  const scores = { G: 0, S: 0, D: 0, C: 0 };
  steps.forEach((step, i) => {
    const val = step.querySelector(`input[name="q${i + 1}"]:checked`)?.value;
    if (val in scores) scores[val]++;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function showResult(form, btn, typeKey) {
  const type = TYPES[typeKey];
  btn.hidden = true;

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
  result.querySelector(".quiz-card__retry").addEventListener("click", () => {
    location.reload();
  });

  form.appendChild(result);
}

