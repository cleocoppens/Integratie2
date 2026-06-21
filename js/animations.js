export function initScrollAnimations() {
  const observer = new IntersectionObserver(onIntersect, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
}

export function revealElement(el) {
  const observer = new IntersectionObserver(onIntersect, { threshold: 0.12 });
  observer.observe(el);
}

function onIntersect(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    entry.observer?.unobserve(entry.target);
  });
}
