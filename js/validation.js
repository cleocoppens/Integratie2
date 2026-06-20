const MESSAGES = {
  required: "Dit veld is verplicht.",
  email:    "Vul een geldig e-mailadres in.",
  phone:    "Vul een geldig telefoonnummer in.",
  maxlength: (max) => `Maximaal ${max} karakters toegestaan.`,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\s()/-]{8,20}$/;

export function initFormValidation() {
  const forms = document.querySelectorAll(".contact-form");
  forms.forEach(form => {
    setupFormValidation(form);
    setupCharCount(form);
  });
}

function setupFormValidation(form) {
  setupSubmitToggle(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = Array.from(form.querySelectorAll(".field__input"));
    let firstInvalid = null;
    for (const input of inputs) {
      const error = validateInput(input);
      if (error === "") { clearError(input); }
      else { showError(input, error); if (!firstInvalid) firstInvalid = input; }
    }
    if (firstInvalid) { firstInvalid.focus(); return; }

    const btn = form.querySelector("[type='submit']");
    btn.disabled = true;

    try {
      const res  = await fetch("api/contact.php", { method: "POST", body: new FormData(form) });
      const json = await res.json();
      if (json.success) {
        showContactSuccess();
      } else {
        btn.disabled = false;
      }
    } catch {
      btn.disabled = false;
    }
  });
}

function setupSubmitToggle(form) {
  const btn    = form.querySelector("[type='submit']");
  const inputs = Array.from(form.querySelectorAll(".field__input"));
  if (!btn) return;

  function checkReady() {
    btn.disabled = !inputs.every(inp => inp.value.trim() !== "");
  }

  inputs.forEach(inp => {
    inp.addEventListener("input",  () => { clearError(inp); checkReady(); });
    inp.addEventListener("change", () => { clearError(inp); checkReady(); });
    inp.addEventListener("blur",   () => {
      if (inp.value.trim() !== "") {
        const err = validateInput(inp);
        if (err) showError(inp, err); else clearError(inp);
      }
      checkReady();
    });
  });
  checkReady();
}

function showContactSuccess() {
  const success = document.querySelector(".contact-success");
  const form    = document.querySelector(".contact-form");
  if (success) success.hidden = false;
  if (form)    form.hidden    = true;

  success.querySelector(".contact-success__retry")?.addEventListener("click", () => {
    form.reset();
    form.querySelector("[type='submit']").disabled = true;
    form.hidden    = false;
    success.hidden = true;
  }, { once: true });
}

function setupCharCount(form) {
  const textarea = form.querySelector("textarea[maxlength]");
  if (!textarea) return;
  const max  = parseInt(textarea.getAttribute("maxlength"), 10);
  const span = form.querySelector("[data-contact-char-count]");
  const wrap = span?.closest(".field__count");

  function update() {
    const len = textarea.value.length;
    if (span) span.textContent = len;
    if (wrap) wrap.classList.toggle("is-near-limit", len >= max - 10);
  }

  textarea.addEventListener("input", update);
  update();
}

function validateInput(input) {
  const value = input.value.trim();
  if (input.required && value === "") return MESSAGES.required;
  if (value === "") return "";
  if (input.type === "email" && !EMAIL_PATTERN.test(value)) return MESSAGES.email;
  if (input.type === "tel"   && !PHONE_PATTERN.test(value))  return MESSAGES.phone;
  if (input.maxLength > 0 && input.value.length > input.maxLength)
    return MESSAGES.maxlength(input.maxLength);
  return "";
}

function showError(input, message) {
  const target = findErrorNode(input);
  input.setAttribute("aria-invalid", "true");
  if (!target) return;
  target.textContent = message;
  target.hidden = false;
}

function clearError(input) {
  const target = findErrorNode(input);
  input.removeAttribute("aria-invalid");
  if (!target) return;
  target.textContent = "";
  target.hidden = true;
}

function findErrorNode(input) {
  return document.querySelector(`[data-error-for="${input.id}"]`);
}
