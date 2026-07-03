// Syllabus Snap — waitlist form + scroll reveals

// 1) Create a free form at https://formspree.io (sign in with Gmail),
// 2) copy your form ID, and replace YOUR_FORM_ID below before sharing the link.
const FORM_ENDPOINT = "https://formspree.io/f/mkolpkdw";

const isConfigured = !FORM_ENDPOINT.includes("YOUR_FORM_ID");

function setNote(form, message, state) {
  const note = form.parentElement.querySelector("[data-form-note]");
  if (!note) return;
  note.textContent = message;
  note.classList.remove("is-success", "is-error");
  if (state) note.classList.add(state);
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector("input[type=email]").value.trim();
  if (!email) return;

  if (!isConfigured) {
    setNote(form, "Form isn't connected yet — add your Formspree ID in script.js.", "is-error");
    return;
  }

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Joining…";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
    form.reset();
    setNote(form, "You're on the list! Watch your inbox at launch. 🎉", "is-success");
    button.textContent = "You're in ✓";
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    setNote(form, "Something went wrong — try again in a minute.", "is-error");
    button.disabled = false;
    button.textContent = "Get early access";
  }
}

document.querySelectorAll(".waitlist-form").forEach((form) => {
  form.addEventListener("submit", handleSubmit);
});

// Scroll reveals — skipped for users who prefer reduced motion (CSS shows
// .reveal elements immediately in that case).
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}
