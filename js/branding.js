// A brief branded introduction runs on every page load.
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const loader = document.createElement('div');
  loader.className = 'portfolio-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = '<div class="portfolio-loader__content"><div class="loader-emblem"><span class="loader-orbit"></span><img src="assets/logo.svg" alt="" width="86" height="86"></div><span class="portfolio-loader__name">Uduikhue Osamudiamen</span><span class="portfolio-loader__subtitle">Ideas. Curiosity. Craft.</span><span class="portfolio-loader__track"></span></div>';
  let timeout;
  function dismiss() {
    clearTimeout(timeout);
    loader.remove();
    root.classList.remove('intro-active');
    document.removeEventListener('keydown', dismiss);
    document.removeEventListener('pointerdown', dismiss);
  }
  if (!preference.matches) {
    root.classList.add('intro-active');
    document.body.append(loader);
    timeout = setTimeout(dismiss, 1450);
    document.addEventListener('keydown', dismiss, { once: true });
    document.addEventListener('pointerdown', dismiss, { once: true });
  }
  preference.addEventListener('change', event => { if (event.matches) dismiss(); });
  window.addEventListener('pagehide', dismiss, { once: true });
})();
