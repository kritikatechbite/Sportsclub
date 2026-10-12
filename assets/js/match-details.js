/* Sportsclub match details modal. Replace these URLs with your own published destinations. */
(function () {
  'use strict';
  var popupLinks = {
    primary: 'scores.html',  // View Match Details
    secondary: 'sports.html', // Explore More Sports
    close: 'scores.html'     // Close (X) navigates to Match Centre
  };
  var overlay = document.getElementById('mdOverlay');
  var modal = document.getElementById('mdModal');
  if (!overlay || !modal) return;
  document.getElementById('mdPrimaryLink').href = popupLinks.primary;
  document.getElementById('mdSecondaryLink').href = popupLinks.secondary;
  document.getElementById('mdCloseLink').href = popupLinks.close;
  document.body.classList.add('md-modal-open');
  var siblings = Array.from(document.body.children).filter(function (el) {
    return el !== overlay && el.tagName !== 'SCRIPT';
  });
  siblings.forEach(function (el) { el.setAttribute('inert', ''); });
  // Keep keyboard focus within the dialog; its close link is a navigation option.
  overlay.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;
    var focusables = Array.from(modal.querySelectorAll('a[href]'));
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.getElementById('mdCloseLink').focus({preventScroll:true});
})();
