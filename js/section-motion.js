// Progressive enhancement: content remains visible without observer support.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('main > section, main > .meta-strip, main > aside, main .panel, main .card, main .security-tool, main .contact-details, main .planner-layout > aside')];
  const directions = ['rise', 'left', 'right', 'scale'];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('motion-pending');
    observer.unobserve(entry.target);
  }), { threshold: 0.03 });
  targets.forEach((target, index) => {
    target.classList.add('section-motion');
    target.dataset.motion = directions[index % directions.length];
    // Never conceal a direct-link destination or the currently visible content.
    const box = target.getBoundingClientRect();
    if (box.top >= window.innerHeight && !target.contains(document.querySelector(':target'))) {
      target.classList.add('motion-pending'); observer.observe(target);
    } else target.classList.add('motion-enter');
  });
  function revealAnchor() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    targets.forEach(section => {
      if (section === target || section.contains(target)) section.classList.remove('motion-pending');
    });
  }
  window.addEventListener('hashchange', revealAnchor);
  document.addEventListener('focusin', event => targets.forEach(section => {
    if (section.contains(event.target)) section.classList.remove('motion-pending');
  }));
  preference.addEventListener('change', () => {
    if (preference.matches) {
      observer.disconnect(); targets.forEach(section => section.classList.remove('motion-pending'));
    }
  });
})();
