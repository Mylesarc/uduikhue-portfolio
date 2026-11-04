(() => {
  // A single frame updates progress regardless of how many scroll events arrive.
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let frame;
  function updateProgress() {
    const available = document.documentElement.scrollHeight - innerHeight;
    const fraction = available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0;
    progress.style.transform = 'scaleX(' + fraction + ')';
    frame = undefined;
  }
  function requestProgress() {
    if (frame === undefined) frame = requestAnimationFrame(updateProgress);
  }
  addEventListener('scroll', requestProgress, { passive: true });
  addEventListener('resize', requestProgress);
  if ('ResizeObserver' in window) new ResizeObserver(requestProgress).observe(document.body);
  requestProgress();

  const filterBar = document.querySelector('.project-filter-bar');
  if (filterBar) {
    const cards = [...document.querySelectorAll('[data-project-category]')];
    const filters = [...filterBar.querySelectorAll('[data-filter]')];
    function filter(category) {
      let count = 0;
      cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.projectCategory !== category;
        if (!card.hidden) {
          count++;
          card.classList.remove('motion-pending');
        }
      });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
      filterBar.querySelector('[role="status"]').textContent = 'Showing ' + count + (count === 1 ? ' project' : ' projects');
      requestProgress();
    }
    filters.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
    // Restore a filtered-out brief when opened through a direct link.
    function revealLinkedCard() {
      const target = document.getElementById(location.hash.slice(1));
      if (target?.closest('[data-project-category]')) filter('all');
    }
    addEventListener('hashchange', revealLinkedCard);
    revealLinkedCard();
    filterBar.hidden = false;
  }

  const gallery = [...document.querySelectorAll('.gallery-item')];
  if (!gallery.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'portrait-dialog';
  dialog.setAttribute('aria-label', 'Portrait viewer');
  dialog.innerHTML = '<div class="gallery-dialog-toolbar"><span class="gallery-position"></span><button type="button" class="gallery-close" aria-label="Close portrait viewer">Close &times;</button></div><img class="gallery-full" alt="" width="627" height="627"><div class="gallery-dialog-footer"><button type="button" class="gallery-previous" aria-label="Previous portrait">&larr;</button><p class="gallery-caption" aria-live="polite"></p><button type="button" class="gallery-next" aria-label="Next portrait">&rarr;</button></div>';
  document.body.append(dialog);
  let current = 0;
  let opener;
  function show(index) {
    current = (index + gallery.length) % gallery.length;
    const link = gallery[current];
    const image = dialog.querySelector('img');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('.gallery-caption').textContent = link.dataset.caption;
    dialog.querySelector('.gallery-position').textContent = (current + 1) + ' / ' + gallery.length;
  }
  gallery.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    dialog.showModal();
    document.documentElement.classList.add('gallery-open');
    dialog.querySelector('.gallery-close').focus();
  }));
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-previous').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-open');
    opener?.focus();
  });
})();
