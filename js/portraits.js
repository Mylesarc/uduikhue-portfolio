// Portraits rotate only while visible and while the reader is not interacting.
(() => {
  const carousel = document.querySelector('.portrait-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.portrait-slide')];
  const controls = document.querySelector('.portrait-controls');
  const dots = [...controls.querySelectorAll('[data-slide]')];
  const pause = controls.querySelector('.portrait-pause');
  const announcement = controls.querySelector('.portrait-announcement');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = preference.matches;
  let hovering = false;
  let visible = true;
  let timer;
  function show(index, manual = false) {
    current = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
      dots[i].setAttribute('aria-pressed', String(i === index));
    });
    carousel.querySelector('.portrait-counter').textContent = String(index + 1).padStart(2, '0') + ' / 04';
    if (manual) announcement.textContent = slides[index].alt;
  }
  function schedule() {
    clearInterval(timer);
    pause.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    if (paused || hovering || !visible || document.hidden || controls.contains(document.activeElement)) return;
    timer = setInterval(() => show((current + 1) % slides.length), 3000);
  }
  // Load the other small portraits only once the slideshow is enhanced.
  slides.slice(1).forEach(slide => { slide.loading = 'eager'; });
  controls.hidden = false;
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i, true); schedule(); }));
  const visual = carousel.closest('.hero-visual');
  visual.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  visual.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  controls.addEventListener('focusin', schedule);
  controls.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  preference.addEventListener('change', () => { paused = preference.matches; schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      schedule();
    }).observe(carousel);
  }
  window.addEventListener('pagehide', () => clearInterval(timer));
  window.addEventListener('pageshow', schedule);
  schedule();
})();
