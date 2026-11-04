// Show the short introduction once per tab. Storage restrictions remain harmless.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || location.hash) return;
  try {
    if (sessionStorage.getItem('portfolio-intro-seen')) return;
    sessionStorage.setItem('portfolio-intro-seen', 'true');
  } catch {
    // Continue with a bounded introduction if session storage is unavailable.
  }
  const loader = document.createElement('div');
  loader.className = 'portfolio-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = '<div class="portfolio-loader__content"><img src="assets/logo.svg" alt="" width="86" height="86"><span class="portfolio-loader__name">Uduikhue Osamudiamen</span><span class="portfolio-loader__track"></span></div>';
  document.body.append(loader);
  const dismiss = () => loader.remove();
  window.setTimeout(dismiss, 1500);
  // Reveal navigation immediately when someone begins using the keyboard.
  document.addEventListener('keydown', dismiss, { once: true });
  window.addEventListener('pagehide', dismiss, { once: true });
})();
