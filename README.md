# Syllabus Snap — Waitlist Landing Page

Photograph your syllabus. Never miss a due date.

A static one-page site that pitches the app and collects waitlist emails.
No build step — just HTML/CSS/JS.

## Before you share the link (2 minutes)

The email form needs a free [Formspree](https://formspree.io) account:

1. Sign up at formspree.io with your Gmail.
2. Create a new form (call it "Syllabus Snap Waitlist").
3. Copy the form ID from the endpoint it gives you (`https://formspree.io/f/abcd1234`).
4. In `script.js`, replace `YOUR_FORM_ID` with that ID.

Every signup then arrives in your email and shows up in the Formspree dashboard.
Free tier = 50 submissions/month, which is plenty for validation.

## Run locally

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Deploy free

**GitHub Pages** (recommended):

```bash
git init && git add -A && git commit -m "feat: waitlist landing page"
gh repo create syllabus-snap --public --source=. --push
gh api repos/{owner}/syllabus-snap/pages -X POST -f 'source[branch]=main' -f 'source[path]=/'
```

Site goes live at `https://<username>.github.io/syllabus-snap/` within a few minutes.

**Vercel** (alternative): `npx vercel` from this folder, follow the prompts.

## Files

- `index.html` — page structure and copy
- `styles.css` — design system ("paper & highlighter" theme) + animations
- `script.js` — waitlist form submission + scroll reveals
