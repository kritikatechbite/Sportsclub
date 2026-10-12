/* Sportsclub – shared behaviour (header, forms, FAQ, ticker, back-to-top) */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Image fallback (keeps layout intact if a photo fails to load) ---------- */
  var FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#131F33"/><stop offset="1" stop-color="#0e3a2f"/></linearGradient></defs>' +
    '<rect width="800" height="500" fill="url(#g)"/>' +
    '<circle cx="400" cy="250" r="90" fill="none" stroke="#B8FF3B" stroke-width="8" opacity=".55"/>' +
    '<path d="M330 215c45 8 85 40 105 90M470 195c-50 0-90 25-115 70" fill="none" stroke="#B8FF3B" stroke-width="8" stroke-linecap="round" opacity=".55"/></svg>');
  function fixImg(img) {
    if (img.dataset.fallback) return;
    img.dataset.fallback = "1";
    img.removeAttribute("srcset");
    img.src = FALLBACK;
  }
  document.addEventListener("error", function (e) {
    if (e.target && e.target.tagName === "IMG") fixImg(e.target);
  }, true);
  $$("img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fixImg(img);
  });

  /* ---------- Sticky header scroll effect + back-to-top ---------- */
  var header = $("#siteHeader");
  var toTop = $(".to-top");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile navigation ---------- */
  var navToggle = $(".nav-toggle");
  var nav = $("#mainNav");
  var searchToggle = $(".search-toggle");
  var searchPanel = $("#searchPanel");

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  function setSearch(open) {
    if (!searchPanel || !searchToggle) return;
    searchPanel.classList.toggle("is-open", open);
    searchToggle.setAttribute("aria-expanded", String(open));
    if (open) { var i = $("#siteSearch"); if (i) i.focus(); }
  }
  if (navToggle) navToggle.addEventListener("click", function () {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
    setSearch(false);
  });
  if (searchToggle) searchToggle.addEventListener("click", function () {
    setSearch(searchToggle.getAttribute("aria-expanded") !== "true");
    setNav(false);
  });
  $$("#mainNav a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setNav(false); setSearch(false); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1024) setNav(false); });

  /* ---------- Email validation helper ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  window.SC = window.SC || {};
  window.SC.isEmail = function (v) { return EMAIL_RE.test(String(v).trim()); };

  /* ---------- Newsletter forms (frontend validation only – no backend configured) ---------- */
  $$("[data-newsletter]").forEach(function (form) {
    var input = $("input[type=email]", form);
    var msg = $(".form-msg", form);
    function show(text, type) {
      msg.textContent = text;
      msg.className = "form-msg " + (type ? "is-" + type : "");
    }
    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
      show("", "");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) {
        input.setAttribute("aria-invalid", "true");
        show("Please enter your email address.", "error");
        input.focus();
        return;
      }
      if (!window.SC.isEmail(v)) {
        input.setAttribute("aria-invalid", "true");
        show("That doesn't look like a valid email address.", "error");
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      /* No newsletter service is connected yet, so nothing is sent or stored. */
      show("Email looks good! Newsletter delivery isn't connected in this demo, so nothing was submitted.", "success");
      form.reset();
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      $$(".faq-q").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  /* ---------- Horizontal ticker controls ---------- */
  $$("[data-ticker]").forEach(function (wrap) {
    var track = $(".ticker__track", wrap);
    var prev = $("[data-ticker-prev]", wrap);
    var next = $("[data-ticker-next]", wrap);
    if (!track) return;
    function step() { return Math.max(240, Math.round(track.clientWidth * 0.8)); }
    function update() {
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    new MutationObserver(update).observe(track, { childList: true });
    update();
  });

  /* ---------- Sports page: highlight the section in view ---------- */
  var jump = $$(".sport-jump a");
  if (jump.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          jump.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".sport-block").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Contact form (frontend validation; no backend) ---------- */
  var cf = $("#contactForm");
  if (cf) {
    var alertBox = $("#formAlert");
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters)."; },
      email: function (v) { return window.SC.isEmail(v) ? "" : "Please enter a valid email address."; },
      subject: function (v) { return v.trim().length >= 3 ? "" : "Please add a short subject."; },
      message: function (v) { return v.trim().length >= 20 ? "" : "Your message should be at least 20 characters."; }
    };
    function check(field) {
      var input = cf.elements[field];
      var wrap = input.closest(".field");
      var err = rules[field](input.value);
      wrap.classList.toggle("has-error", !!err);
      $(".error", wrap).textContent = err;
      input.setAttribute("aria-invalid", err ? "true" : "false");
      return !err;
    }
    Object.keys(rules).forEach(function (f) {
      cf.elements[f].addEventListener("blur", function () { check(f); });
      cf.elements[f].addEventListener("input", function () {
        if (cf.elements[f].closest(".field").classList.contains("has-error")) check(f);
      });
    });
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      alertBox.className = "form-alert";
      var results = Object.keys(rules).map(check);
      if (results.indexOf(false) !== -1) {
        alertBox.className = "form-alert is-error";
        alertBox.textContent = "Please fix the highlighted fields and try again.";
        var bad = cf.querySelector(".has-error input, .has-error textarea");
        if (bad) bad.focus();
        return;
      }
      /* No mail backend is configured, so the message is NOT sent anywhere. */
      alertBox.className = "form-alert is-success";
      alertBox.textContent = "Thanks – your details passed validation. This demo form isn't connected to a mail service yet, so your message was not sent. Email us directly at hello@sportsclub.example.";
      cf.reset();
      Object.keys(rules).forEach(function (f) { cf.elements[f].removeAttribute("aria-invalid"); });
    });
  }
})();
