// Apply the saved choice before rendering the page to avoid a theme flash.
(() => {
  let theme = 'light';
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch {
    // A theme choice still works when browser storage is unavailable.
  }
  document.documentElement.dataset.theme = theme;
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const update = () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.querySelector('span').textContent = dark ? 'Light mode' : 'Dark mode';
      document.querySelector('meta[name="theme-color"]').content = dark ? '#091424' : '#e2edf9';
    };
    button.hidden = false;
    update();
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch {}
      update();
    });
  });
})();
