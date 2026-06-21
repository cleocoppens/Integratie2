export function initCountdown() {
  const hmEl  = document.getElementById("countdown-hm");
  const sEl   = document.getElementById("countdown-s");
  const clock = document.getElementById("countdown-clock");
  const btn   = document.getElementById("countdown-checkin");
  if (!hmEl || !sEl) return;

  tick(hmEl, sEl);
  setInterval(() => tick(hmEl, sEl), 1000);

  if (btn) btn.addEventListener("click", () => handleCheckin(clock, btn));
}

function handleCheckin(clock, btn) {
  const now  = new Date();
  const nine = new Date(now);
  nine.setHours(9, 0, 0, 0);

  if (nine > now) {
    clock.classList.add("countdown--success");
    btn.textContent = "First In!";
    btn.disabled = true;
    launchConfetti();
  } else {
    clock.classList.remove("countdown--late");
    void clock.offsetWidth;
    clock.classList.add("countdown--late");
  }
}

function tick(hmEl, sEl) {
  const now  = new Date();
  const nine = new Date(now);
  nine.setHours(9, 0, 0, 0);

  const diffMs = nine - now;
  const ms     = diffMs > 0 ? diffMs : -diffMs;

  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  hmEl.textContent = `${pad(h)}:${pad(m)}`;
  sEl.textContent  = `:${pad(s)}`;
}

function launchConfetti() {
  const colors  = ["#ffb200", "#00b095", "#ff4b1a", "#2f4bff", "#34d8bd"];
  const vw      = window.innerWidth;
  const vh      = window.innerHeight;
  const pieces  = [];

  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.style.cssText = [
      "position:fixed",
      "pointer-events:none",
      "z-index:9999",
      `left:${Math.random() * vw}px`,
      "top:-12px",
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `width:${5 + Math.random() * 9}px`,
      `height:${5 + Math.random() * 9}px`,
      `border-radius:${Math.random() > 0.5 ? "50%" : "2px"}`,
    ].join(";");
    document.body.appendChild(el);
    pieces.push({
      el,
      y:          -12,
      speed:      3 + Math.random() * 5,
      rot:        Math.random() * 360,
      rotSpeed:   (Math.random() - 0.5) * 8,
      startFrame: Math.floor(Math.random() * 30),
    });
  }

  let frame = 0;
  function step() {
    frame++;
    let alive = 0;
    for (const p of pieces) {
      if (!p.el.parentNode) continue;
      if (frame < p.startFrame) { alive++; continue; }
      p.y   += p.speed;
      p.rot += p.rotSpeed;
      if (p.y > vh + 20) {
        p.el.remove();
      } else {
        p.el.style.top       = `${p.y}px`;
        p.el.style.transform = `rotate(${p.rot}deg)`;
        alive++;
      }
    }
    if (alive > 0) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function pad(n) {
  return String(n).padStart(2, "0");
}
