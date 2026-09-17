STORY_DUFF_BEER

START HERE
1. Extract the complete Story_Duff_Beer.zip.
2. Keep all files in the extracted Story_Duff_Beer folder together.
3. Open Story_Duff_Beer.html in a modern web browser.
4. Answer the age-entry popup, then use “Explore the 3D can”.

FILES
Story_Duff_Beer.html — main story website
index.html — identical homepage for local previews/static hosting
Duff_3D.html — linked interactive 3D page
styles.css — all page styling and mobile layouts
app.js — menu, age entry, clue, newsletter demo, and library loading
scene.js — 3D can, materials, label, lights, and camera controls
vendor/babylon.js — supplied Babylon.js library; do not replace with scene code

No Week 4 names, comparison page, install step, or external image downloads.
The project uses regular HTML, CSS, and JavaScript; no build process is needed.
If your browser restricts local files, use your editor's local preview server.

CUSTOMIZE
Edit the story and section text in Story_Duff_Beer.html. Copy changes to
index.html if using it as a hosting entry point. Edit the linked 3D page in
Duff_3D.html. The label wording is drawn in scene.js with fillText calls.

BEHAVIOR
- Age entry is a self-declaration interface, not identity verification.
  It remembers consent for this browser session when storage is available.
- Newsletter signup is a labeled demo. It sends and stores no email data.
  Connect a mailing service before using it for actual subscriptions.
- Products/merch are fictional concepts. There is no checkout or real sale.
- Sponsors section states that the project has no sponsors.
- Reduced-motion preferences disable automatic rotation initially.
- Drag or use arrow keys with the canvas focused to orbit. Scroll/pinch to
  zoom. Tab leaves the canvas. Pause and reset controls are on the 3D page.

A Simpsons-inspired fan project, not affiliated with the rights holders.

VALIDATION
JavaScript syntax, local links and anchors, age/menu-related setup, newsletter
demo, clue action, and library-load error handling were checked. Can geometry
and a render call passed with Babylon NullEngine. This is not a visual GPU
render test; actual browser appearance and device controls remain unverified.
