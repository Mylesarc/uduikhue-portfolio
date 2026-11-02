# Joshua Uduikhue - COS 106 portfolio

A responsive, five-page student portfolio and academic planner for Uduikhue Osamudiamen Joshua, a first-year BSc Cybersecurity student at Miva Open University. Built with semantic HTML, shared CSS stylesheets, and plain JavaScript. No framework, package installation, backend, or build step is required.

## Status

Phase 4 prepares the implementation for handoff. Submission is still pending confirmation of technical skills/sample project content, and Phase 5 publication. No live website or GitHub repository URL has been verified yet. The local preview address is not a public submission URL.

## Local preview

In PowerShell, from the project folder:

```powershell
Set-Location 'C:\Users\PC\Documents\ChatGPT\uduikhue'
python -m http.server 8001 --bind 127.0.0.1
```

Open http://127.0.0.1:8001/. If the preview is already running, reuse it. Stop a server you launched with Ctrl+C. If Python is not on PATH, the bundled Python used during development is:

```powershell
& 'C:\Users\PC\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8001 --bind 127.0.0.1
```

A static server gives task storage a consistent origin. Opening HTML directly with file:// can behave differently across browsers. No install or npm command is needed to run the site.

## Files and features

| File | Purpose |
| --- | --- |
| index.html | Student introduction, biography, photograph placeholder, navigation |
| about.html | Education table, career aspiration, learning areas, hobbies, audio |
| projects.html | Three labelled sample concepts with original graphics and local brief links |
| planner.html | Add, complete/uncomplete, delete, and save academic tasks |
| contact.html | Four-field local validation demonstration and direct contact links |
| css/styles.css | Base layout, components, responsive rules, and form states |
| css/tech-theme.css | Current dark design tokens, typography, hero, bento layouts, and responsive theme |
| js/main.js | Progressive mobile menu and project brief links |
| js/planner.js | Task array, DOM rendering, events, and localStorage handling |
| js/contact.js | Required values, email and digits-only phone validation |
| assets/ | Local original SVG images and short WAV audio |
| REQUIREMENTS.md | Assignment requirement-to-implementation matrix |
| DEMONSTRATION.md | Short presentation script and code explanation |
| AUDIT.md | Verification results and submission blockers |
| tools/audit-site.py | Dependency-free structural/link/colour checks |
| tools/check-phase3.cjs | Focused storage and validation checks |

The initial generator in tools/build-phase2.py is historical scaffolding. Do not rerun it over the finished website: edit the HTML, CSS, and JavaScript directly.

## Personalise before submission

1. Add your photograph to assets/images/, then replace the image source and alt text in index.html within student-photo-note, and update its pending-photo caption. A portrait approximately 800px wide in JPEG or WebP is sufficient. Adjust object-fit only if necessary; review mobile cropping.
2. Replace the suggested learning areas in about.html with your confirmed skills and accurate proficiency descriptions.
3. Review the three sample project concepts. Keep the sample labels if they remain demonstrations; use actual descriptions, images, and links if replacing them with your own work. The assignment allows simulated links; the current links expand local project briefs.
4. Optionally replace the original chime with your own introduction audio. Update the source MIME type, accessible name, and supporting description. The chime already provides working multimedia; a personal recording is an enhancement.
5. Review the public email and phone number, biography, programme, and spelling before publication.
6. Header/footer markup is deliberately present in all five pages. Update each copy when changing shared navigation or identity text.

## Data and contact behavior

Tasks are stored only in the current browser and origin under joshua-academic-tasks-v1. They are not synced between devices, browsers, ports, or the local and hosted sites. Clearing site data removes tasks. Unavailable storage produces a visible warning while the list remains usable in memory. Invalid saved data produces a recovery notice; making a task change replaces unreadable saved data.

The contact form checks input locally, preserves values on errors, and never sends or saves a message. A successful check explicitly states that no message has been sent. Use the email link for actual contact. Phone input remains a string so leading zeros survive; digits only are accepted. There is no country-specific length rule.

## Checks

With Python 3 and Node.js installed:

```powershell
python tools/audit-site.py
node --check js/main.js
node --check js/planner.js
node --check js/contact.js
node tools/check-phase3.cjs
```

No third-party testing dependencies are needed. The audit writes a local report under tmp/audit/, which is ignored by Git. These checks supplement browser review; they do not certify full accessibility or cross-browser compatibility.

## Deployment preparation - Phase 5 approval required

The site is ready for a static host. Publish the five HTML files plus css/, js/, and assets/, preserving their relative paths. There is no build command. Keep index.html at the publishing root. A .nojekyll file is included for direct static publishing on GitHub Pages.

After the repository destination and visibility are agreed, push the reviewed source. For GitHub Pages, choose the repository Settings > Pages, select Deploy from a branch, and select the source branch (normally main) and /(root), then save. The branch must already exist. Confirm the deployed URL provided by GitHub and test all five public pages before submission. These steps follow the [GitHub publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [site creation documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

Do not submit localhost. Submit both the verified public website URL and the GitHub repository URL. Publication and remote changes have not been performed in Phase 4.

## Assets and attribution

portrait-placeholder.svg, password.svg, phishing.svg, study.svg, and portfolio-chime.wav were created specifically for this coursework site. No third-party photographs, stock imagery, remote fonts, CDN scripts, or paid services are used. The portrait is an illustration, not the student's photograph. The chime contains three synthesised ascending notes and no speech. Retain honest labels and add attribution if replacing assets with licensed third-party material.

## AI photo update - 2 November 2026

Three AI-generated editorial photos now appear across the Home, About, Projects, Planner, and Contact pages. They are illustrative scenes, not personal photographs or project screenshots. Local WebP assets total about 187 KB; non-hero photos use lazy loading. Original SVG illustrations remain available. Generation prompts, filenames, and placement details are in assets/images/AI-PHOTOS.md. The genuine student portrait remains outstanding.

## Supplied portraits

Four user-supplied AI portraits now replace the hero placeholder and illustrate About, Skills, and Contact. See PORTRAIT-INTEGRATION.md for the current integration phase and assets/images/portraits/README.md for image provenance and placements. Images are labelled honestly as AI-generated. Local Inter and Space Grotesk fonts are included with their licences in assets/fonts/. Older placeholder instructions above describe the earlier design and are superseded by this portrait integration. Photo Phase 3 QA awaits approval.

## Premium tech redesign - 2 November 2026

The current design uses a dark navy workspace palette, blue/cyan accents, Space Grotesk, Inter, and locally hosted JetBrains Mono. The Home hero presents the requested name, portrait, calls to action, scroll cue, technical grid, and explicitly labelled static personal-branding terminal. About uses an asymmetric editorial layout; project entries use a featured composition; Planner and Contact retain their existing functionality in the new theme. Colours and theme-specific styling are defined in css/tech-theme.css, loaded after the base stylesheet. Public copy retains the requested removal of course identifiers and generated-image labels.
