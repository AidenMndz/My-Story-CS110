(function () {
  'use strict';
  var dialog = document.getElementById('ageDialog');
  var approved = false;
  try { approved = sessionStorage.getItem('duffAgeConfirmed') === 'yes'; } catch (_) {}
  function openAgeEntry() {
    if (dialog && !dialog.open) dialog.showModal();
  }
  if (!approved) openAgeEntry();
  document.getElementById('ageYes').addEventListener('click', function () {
    approved = true;
    try { sessionStorage.setItem('duffAgeConfirmed', 'yes'); } catch (_) {}
    dialog.close();
  });
  document.getElementById('ageNo').addEventListener('click', function () {
    document.getElementById('ageStatus').textContent = 'This experience is for visitors 21 and older. Please close this tab to leave.';
  });
  dialog.addEventListener('cancel', function (event) { if (!approved) event.preventDefault(); });
  document.getElementById('ageReset').addEventListener('click', function () {
    approved = false;
    try { sessionStorage.removeItem('duffAgeConfirmed'); } catch (_) {}
    document.getElementById('ageStatus').textContent = '';
    openAgeEntry();
  });
  var menu = document.querySelector('.menu');
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  var newsletter = document.getElementById('newsletterForm');
  if (newsletter) newsletter.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!newsletter.reportValidity()) return;
    document.getElementById('newsletterStatus').textContent = 'Thanks for trying the signup! This is a demo, so no email was sent or saved and no subscription was created.';
    newsletter.reset();
  });
  var clue = document.getElementById('revealClue');
  if (clue) clue.addEventListener('click', function () {
    document.getElementById('storyMessage').textContent = 'The note reads: “Find the arcade where your names are already on the scoreboard.” Next stop: the abandoned amusement park. Looks like the adventure is just getting started.';
    clue.textContent = 'Clue discovered';
    clue.disabled = true;
    console.log('Duff Beer Squad: clue discovered. Next stop: the abandoned amusement park.');
  });
  var status = document.getElementById('sceneStatus');
  var library = document.createElement('script');
  library.src = 'vendor/babylon.js';
  library.onload = function () {
    if (typeof window.startDuffViewer !== 'function') {
      status.textContent = 'The scene code did not load. Keep scene.js beside this HTML file, then refresh.';
      return;
    }
    window.startDuffViewer();
  };
  library.onerror = function () {
    status.hidden = false;
    status.textContent = 'Babylon.js could not load. Extract the complete ZIP and keep vendor/babylon.js inside the Story_Duff_Beer folder.';
  };
  document.head.appendChild(library);
})();
