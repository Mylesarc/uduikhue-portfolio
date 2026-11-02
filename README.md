# Uduikhue Osamudiamen - Personal portfolio

A responsive cybersecurity student portfolio and academic planner, built with semantic HTML, CSS, and plain JavaScript.

- **Live website:** https://mylesarc.github.io/uduikhue-portfolio/
- **GitHub repository:** https://github.com/Mylesarc/uduikhue-portfolio

## Pages

Home introduces Uduikhue Osamudiamen and his interests in cybersecurity, networking, and development. About includes a biography, educational background table, career aspiration, suggested learning areas, hobbies, and playable audio. Projects includes the study planner, a local password-pattern explorer, and a four-scenario phishing awareness quiz. Planner supports adding, completing/uncompleting, deleting, and locally saving tasks. Contact validates name, email, digits-only phone, and message fields with accessible error feedback.

## Run locally

From the project root, with Python 3 installed:

```powershell
python -m http.server 8001 --bind 127.0.0.1
```

Open http://127.0.0.1:8001/. Stop your server with Ctrl+C. No package installation or build step is required.

## Source structure

- index.html, about.html, projects.html, planner.html, contact.html: five standalone pages.
- css/styles.css: base components and functionality styles.
- css/tech-theme.css: inherited responsive layout rules.
- css/blue-theme.css: current soft light-blue palette with the original tech-style composition and restrained decoration.
- js/main.js: mobile menu, project links, and portrait reveals.
- js/planner.js: task arrays, rendering, event handlers, persistence, and storage recovery.
- js/contact.js: validation, Formspree delivery, and accessible sending/error feedback.
- assets/: portraits, concept imagery, audio, locally hosted fonts, and licences.
- REQUIREMENTS.md, DEMONSTRATION.md, TECH-REDESIGN.md, DEPLOYMENT.md: checklist, demonstration guide, design notes, and deployment verification.

## Behavior and limits

Tasks are saved in the current browser and origin under joshua-academic-tasks-v1. They do not sync across browsers/devices, and localhost tasks do not transfer to the hosted site. Clearing site data removes them. Storage errors produce visible feedback while tasks remain usable in memory.

The contact form validates locally, then submits name, email, phone, and message to the configured Formspree endpoint over HTTPS. It prevents duplicate requests, retains text on failure, and confirms success only after service acceptance. Acceptance does not guarantee inbox receipt. Phone numbers remain strings to preserve leading zeros. The direct email link remains available.

All three entries are working educational demonstrations. The password explorer uses limited local heuristics; it does not check breaches or estimate cracking time. The phishing quiz uses fictional, non-clickable examples. Neither security tool sends or stores entered data. Skills and learning focus include the owner-confirmed cybersecurity, ethical hacking, and database management; no proficiency level is claimed. Portrait and concept-asset provenance is documented under assets/; fonts include their licence texts. No remote fonts, CDN scripts, or custom backend are needed. Contact delivery depends on the owner's verified Formspree form and its service limits.

## Checks

With Python 3 and Node.js:

```powershell
python tools/audit-site.py
node --check js/main.js
node --check js/planner.js
node --check js/contact.js
node tools/check-phase3.cjs
node tools/check-contact.cjs
node tools/check-security-tools.cjs
```

Checks are dependency-free. Browser verification covered desktop, tablet, phone, keyboard navigation, planner persistence, and contact feedback. These checks are not a formal accessibility certification.

## Updating the hosted site

GitHub Pages publishes main from the repository root. Keep index.html, .nojekyll, css/, js/, and assets/ in place and preserve relative paths. Commit and push reviewed changes to main, then check the Pages deployment run in GitHub Actions. Local .tools/, output/, and tmp/ directories are ignored by Git. The old tools/build-phase2.py is historical scaffolding; do not rerun it over the current site.

Submit both the live website and repository links above when required.
