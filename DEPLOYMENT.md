# Deployment verification

Published 2 November 2026 under the user-approved GitHub account and new public repository.

- Account: Mylesarc
- Repository: https://github.com/Mylesarc/uduikhue-portfolio
- Live website: https://mylesarc.github.io/uduikhue-portfolio/
- Source: main, repository root
- HTTPS: enforced
- Initial deployed commit: 9792cb53cbc07b599ea3dad9a35a1333203e6b18
- Successful initial deployment run: https://github.com/Mylesarc/uduikhue-portfolio/actions/runs/41430441205

## Public verification

All 26 unique page/asset URLs returned HTTP 200 with appropriate content types, including the five HTML pages, CSS, JavaScript, portrait variants, concept images, local fonts, and WAV audio. Browser checks confirmed navigation under the repository subdirectory, About images/audio loading, project brief expansion, task add/complete/reload persistence/uncomplete/delete, contact required-field focus and local-only success feedback, and mobile navigation at 360px without horizontal overflow. Temporary test tasks were removed.

The contact form is intentionally a local validation demonstration and sends no messages. Tasks remain browser-local. The skills list still needs personal confirmation and the three sample concepts remain labelled honestly.

## Local state

Source is in the root Git repository, on main, with origin pointing to the public repository. Official GitHub CLI is authenticated through the operating-system keyring. No passwords or access tokens were added to the repository. Temporary binaries, deployment archives, and screenshots are excluded through .gitignore. Commit author uses the GitHub noreply address; global Git author/credential settings were not changed.

The final documentation commit records the verified links and this handoff; page source and assets are unchanged from the tested deployment.

## Contact delivery update

The original local-only contact behavior above is superseded by the Formspree integration at https://formspree.io/f/xbggplwb. The form now submits validated fields with sending feedback, duplicate prevention, and retained text on failure. Real inbox receipt must be confirmed by the owner. No private credentials are included.


## Portfolio polish

Finalised skills wording and audio copy, featured the implemented planner, increased reading and input text, moved the contact form first on small screens, added GitHub footer links, SVG favicon, and a 1200x630 PNG sharing card. Desktop/tablet/mobile layout and local validation checks passed. The Formspree endpoint and sending logic remain unchanged.


## Security learning tools

Both former concepts are implemented in projects.html using js/security-tools.js and css/security-tools.css. Unit checks cover sample patterns and Unicode length; browser checks cover visibility/clear, all four quiz answers, final score, restart and incorrect feedback, plus 360px overflow. Neither tool makes network or storage calls. Learning references are NIST SP 800-63B and CISA phishing guidance.


## Mature theme update

Applied css/mature-theme.css after inherited styles across all five pages. Warm off-white, navy-grey text, muted green accents, simple borders, and no glow/grid decoration. Sharing card and favicon match. Structural/contrast checks plus all three functional test scripts passed. Existing Formspree routing and all interactive scripts are unchanged.


## Soft blue theme

Restored the original tech-style homepage composition and typography with a pale blue palette. Static personal branding panel retained; glowing effects and animated grid disabled. Functional scripts and assessment features unchanged. Contrast and tablet/phone overflow checks passed.


## Deeper blue and section motion

Deepened the main surface to #d8e7f5 and added four entrance variants through js/section-motion.js. Scroll reveals run once; focus and direct-link targets are revealed, and reduced motion disables movement. Browser checks confirmed all four variants and visible scroll/anchor content. Contrast audit passed. Existing feature logic is unchanged.

