const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const notNowBtn = document.getElementById("notNowBtn");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const result = document.getElementById("result");
const questionText = document.getElementById("questionText");

let dodgeCount = 0;

// Helper: show a message box
function showResult(message) {
  result.hidden = false;
  result.textContent = message;
}

// YES flow
yesBtn.addEventListener("click", () => {
  title.textContent = "YAY!!! 💞";
  subtitle.textContent = "Best answer ever. I’m smiling like an idiot.";
  questionText.textContent = "It’s a date 💘";
  showResult("Send me a screenshot of this page 😄");
  confettiBurst();
});

// “Not now” flow (real choice)
notNowBtn.addEventListener("click", () => {
  title.textContent = "All good ❤️";
  subtitle.textContent = "No pressure. I just wanted you to know.";
  showResult("Whenever you feel like it, you can come back to this page.");
});

// Playful “No” dodge (not forced)
function dodge() {
  dodgeCount++;

  // After a few dodges, chill out (no infinite annoyance)
  if (dodgeCount >= 6) {
    noBtn.textContent = "Okay okay 😅";
    showResult("No worries — you can tap “Not now” if you’re not feeling it.");
    return;
  }

  // Move button within the card safely
  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 16;
  const maxX = rect.width - btnRect.width - padding * 2;
  const maxY = rect.height - btnRect.height - padding * 2;

  const x = Math.max(padding, Math.floor(Math.random() * maxX));
  const y = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const lines = [
    "👀 hehe nope",
    "🏃‍♂️ catch me",
    "🙈 not that one",
    "😜 try again",
    "🫣 too shy"
  ];
  noBtn.textContent = lines[Math.min(dodgeCount - 1, lines.length - 1)];
}

// Trigger dodge on hover (desktop) and on touch (mobile)
noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });

// Tiny confetti (no libraries)
function confettiBurst() {
  const n = 80;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.textContent = Math.random() > 0.5 ? "💖" : "✨";
    s.style.position = "fixed";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = "-10px";
    s.style.fontSize = (12 + Math.random() * 18) + "px";
    s.style.transform = `rotate(${Math.random() * 360}deg)`;
    s.style.pointerEvents = "none";
    document.body.appendChild(s);

    const duration = 1200 + Math.random() * 1200;
    const xDrift = (Math.random() - 0.5) * 200;
    const yEnd = 110 + Math.random() * 20;

    s.animate([
      { transform: s.style.transform, opacity: 1, top: "-10px" },
      { transform: `translateX(${xDrift}px) rotate(${Math.random() * 720}deg)`, opacity: 0.1, top: yEnd + "vh" }
    ], { duration, easing: "cubic-bezier(.2,.7,.2,1)" });

    setTimeout(() => s.remove(), duration);
  }
}
