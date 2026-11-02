// Enhance navigation only when JavaScript is available.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menuButton.focus();
  }
});

// Support direct links, back/forward navigation, and clicks on concept briefs.
function openLinkedBrief() {
  if (!location.hash.startsWith('#concept-')) return;
  const brief = document.getElementById(location.hash.slice(1));
  if (brief instanceof HTMLDetailsElement) brief.open = true;
}
window.addEventListener('hashchange', openLinkedBrief);
openLinkedBrief();

// Reopen a brief even when its URL fragment is already selected.
document.querySelectorAll('a[href^="#concept-"]').forEach(link => {
  link.addEventListener('click', () => {
    const brief = document.getElementById(link.getAttribute('href').slice(1));
    if (brief instanceof HTMLDetailsElement) brief.open = true;
  });
});

// Reveal portraits without a library; content stays visible if enhancement is unavailable.
const portraitFrames = document.querySelectorAll('.portrait-reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const portraitObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        portraitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  portraitFrames.forEach(frame => {
    frame.classList.add('is-pending');
    portraitObserver.observe(frame);
  });
}
