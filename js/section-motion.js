// Reveal content once as it enters the viewport, with short card staggers.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const selector = 'main > section, main > .meta-strip, main > aside, main .panel, main .card, main .security-tool, main .contact-details, main .planner-layout > aside';
  const targets = [...document.querySelectorAll(selector)];
  const directions = ['rise', 'left', 'right', 'scale'];
  function reveal(target, immediate = false) {
    if (immediate) target.style.setProperty('--reveal-delay', '0ms');
    target.classList.remove('motion-pending');
    observer.unobserve(target);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) reveal(entry.target);
    });
  }, { threshold: 0.03 });
  targets.forEach((target, index) => {
    target.classList.add('section-motion');
    target.dataset.motion = directions[index % directions.length];
    if (target.matches('.card')) {
      const siblings = [...target.parentElement.children];
      target.style.setProperty('--reveal-delay', Math.min(siblings.indexOf(target), 3) * 80 + 'ms');
    }
    const anchor = document.querySelector(':target');
    if (target.getBoundingClientRect().top >= innerHeight && !target.contains(anchor)) {
      target.classList.add('motion-pending');
      observer.observe(target);
    }
  });
  function revealAnchor() {
    const anchor = document.getElementById(location.hash.slice(1));
    if (!anchor) return;
    targets.forEach(target => {
      if (target === anchor || target.contains(anchor)) reveal(target, true);
    });
  }
  addEventListener('hashchange', revealAnchor);
  document.addEventListener('focusin', event => {
    targets.forEach(target => {
      if (target.contains(event.target)) reveal(target, true);
    });
  });
  preference.addEventListener('change', () => {
    if (preference.matches) {
      targets.forEach(target => reveal(target, true));
      observer.disconnect();
    }
  });
  addEventListener('pageshow', event => {
    if (event.persisted) targets.forEach(target => reveal(target, true));
  });
})();
