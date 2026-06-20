// validation.js — client-side validatie als aanvulling op de server-side
// validatie in PHP. Generiek: leest type + required van elk veld.

const MESSAGES = {
  required: "Dit veld is verplicht.",
  email:    "Vul een geldig e-mailadres in.",
  phone:    "Vul een geldig telefoonnummer in.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\s()/-]{8,20}$/;

export function initFormValidation() {
  const forms = document.querySelectorAll(".contact-form");
  forms.forEach(setupFormValidation);
}

function setupFormValidation(form) {
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  const form = event.currentTarget;
  const inputs = form.querySelectorAll(".field__input");
  let firstInvalid = null;

  for (const input of inputs) {
    const error = validateInput(input);
    if (error === "") {
      clearError(input);
    } else {
      showError(input, error);
      if (firstInvalid === null) firstInvalid = input;
    }
  }

  if (firstInvalid !== null) {
    event.preventDefault();
    firstInvalid.focus();
  }
}

function validateInput(input) {
  const value = input.value.trim();
  if (input.required && value === "") return MESSAGES.required;
  if (value === "") return "";
  if (input.type === "email" && !EMAIL_PATTERN.test(value)) return MESSAGES.email;
  if (input.type === "tel"   && !PHONE_PATTERN.test(value))  return MESSAGES.phone;
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
