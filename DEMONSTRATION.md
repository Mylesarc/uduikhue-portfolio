# A short COS 106 demonstration

Practise this explanation in your own words. Present only the parts you understand; review the indicated code before your demonstration.

## 1. Introduction - about 20 seconds

"My name is Uduikhue Osamudiamen Joshua. This is my responsive student portfolio and academic planner, built with HTML, CSS, and JavaScript. It contains five separate pages linked by a consistent navigation menu."

Show Home and explain the biography, programme, and links. Replace the portrait placeholder before final submission; do not present the illustration as your photograph.

## 2. HTML and CSS - about 45 seconds

"HTML provides the structure. I used semantic elements such as header, nav, main, section, article, and footer. The About page contains an education table with a caption and scoped headers, lists of interests, and an audio player with native controls."

Open about.html and play the chime. Explain that it is an original musical sample, not an introduction recording. Show the three labelled sample concepts on Projects and open a project brief.

"The shared external stylesheet keeps colours, typography, and spacing consistent. CSS Grid arranges the hero, project cards, and page columns. Flexbox handles navigation, buttons, and task rows. Media queries stack content on smaller screens. Focus styles support keyboard users, and reduced-motion preferences disable transitions."

Inspect :root, .hero, .cards, and the media queries in css/styles.css.

## 3. Planner - about 60 seconds

Add "Review COS 106 notes", complete it, reload, uncomplete it, and delete it. Also try a blank task.

"The tasks array holds objects with an ID, title, and completed status. A submit event trims and validates the title, then adds an object. renderTasks creates list elements and writes the title with textContent so input stays text. A checkbox change event updates completion, and a delete click removes the matching ID. The task count and empty state update dynamically."

"saveTasks converts the array to JSON and writes it to localStorage. loadTasks reads and validates saved JSON. try/catch handles corrupt data and unavailable storage. Storage is local to this browser and origin, so tasks are not shared between devices."

Review loadTasks, saveTasks, renderTasks, the submit handler, and the delete/change handlers in js/planner.js. An ID identifies a task independently of its array position.

## 4. Contact validation - about 45 seconds

Submit blank fields, then try an invalid email and a phone containing + or letters. Correct the values using dummy data such as Student, student@example.com, 09064351861, and "Hello".

"JavaScript prevents normal form submission, checks trimmed values, verifies a reasonable email pattern, and requires digits only for the phone. The phone remains a string to preserve leading zeros. Errors appear beside the relevant fields, aria-describedby connects the messages, and focus moves to the first invalid field. Values remain available for correction."

"This static form demonstrates validation. It does not send messages, and the success feedback explicitly says so. The email link is the actual contact route."

Review validationMessage, showError, and the submit handler in js/contact.js.

## 5. Finish - about 20 seconds

Resize to mobile, open the Menu, and navigate using the keyboard. Explain that the menu updates aria-expanded and Escape closes it. Show the README and requirements checklist. Once Phase 5 is complete, show both the live website and GitHub repository URLs.

## Questions to practise

- Why five HTML pages? To meet the multi-page requirement and keep introductory code straightforward.
- Why external CSS? One shared design source across all pages.
- What is the DOM? The browser's representation of HTML that JavaScript can read and update.
- What is an event listener? A function registered to respond to actions such as submit, click, or change.
- Why textContent? It displays task text without interpreting it as HTML.
- Why localStorage? It preserves tasks across reloads without a backend; it is a small optional enhancement.
- Does the form email the message? No; it only validates locally.
- Are the sample concepts completed projects? No; they are honestly labelled demonstrations, with simulated local brief links.
