/* SHIVA KRIPA — Housewarming Invitation (vanilla JS) */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const cover = document.getElementById('cover');
  const openBtn = document.getElementById('open-btn');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  /* ---------- 1. Opening cover -> invitation ---------- */
  function playHeroReveal() {
    document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
      window.setTimeout(() => el.classList.add('is-visible'), reduceMotion ? 0 : i * 110);
    });
  }

  function openInvitation() {
    if (!cover || cover.classList.contains('is-gone')) return;
    cover.classList.add('is-gone');
    body.classList.remove('is-locked');
    body.classList.add('is-open');
    window.scrollTo(0, 0);
    window.setTimeout(playHeroReveal, reduceMotion ? 0 : 350);
    // Return focus to the page once the cover has gone.
    window.setTimeout(() => { cover.setAttribute('hidden', ''); }, reduceMotion ? 20 : 950);
  }

  if (openBtn) openBtn.addEventListener('click', openInvitation);

  /* ---------- 2. Navigation ---------- */
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => { if (!nav.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  // Solid bar after scrolling; hide while scrolling down, show on scroll up.
  let lastY = window.scrollY;
  let navTick = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 30);
    const menuOpen = navLinks.classList.contains('is-open');
    if (y > lastY + 6 && y > 140 && !menuOpen) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || y <= 140) nav.classList.remove('is-hidden');
    lastY = y;
    navTick = false;
  }
  window.addEventListener('scroll', () => {
    if (!navTick) { navTick = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ---------- 3. Active section highlighting ---------- */
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  function setActive(name) {
    links.forEach(l => {
      const on = l.dataset.nav === name;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.dataset.section); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
  setActive('home');

  /* ---------- 4. Scroll reveal ---------- */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]')).filter(el => !el.closest('.hero'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5. Countdown (IST) ---------- */
  const MUHURTHAM_START = new Date('2026-12-13T09:34:00+05:30').getTime();
  const MUHURTHAM_END = new Date('2026-12-13T10:20:00+05:30').getTime();
  const box = document.querySelector('.countdown');
  const label = document.getElementById('countdown-label');
  const cells = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-minutes'),
    s: document.getElementById('cd-seconds')
  };
  const pad = (n) => String(n).padStart(2, '0');
  let timer = null;

  function tick() {
    const now = Date.now();
    const diff = MUHURTHAM_START - now;
    if (diff <= 0) {
      box.classList.add('is-done');
      label.textContent = now < MUHURTHAM_END
        ? 'The auspicious muhurtham has begun. Your blessings are with us.'
        : 'Thank you for blessing our new home.';
      if (now >= MUHURTHAM_END && timer) { clearInterval(timer); timer = null; }
      return;
    }
    box.classList.remove('is-done');
    label.textContent = 'Counting down to the muhurtham';
    cells.d.textContent = pad(Math.floor(diff / 86400000));
    cells.h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    cells.m.textContent = pad(Math.floor((diff % 3600000) / 60000));
    cells.s.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  if (box) { tick(); timer = setInterval(tick, 1000); }
})();
