(() => {
  const list = document.getElementById('publication-list');
  const controls = [...document.querySelectorAll('.pagination')];
  if (!list || !controls.length) return;
  const papers = [...list.querySelectorAll('.publication')];
  const previous = [...document.querySelectorAll('[data-paper-page="previous"]')];
  const next = [...document.querySelectorAll('[data-paper-page="next"]')];
  const statuses = [...document.querySelectorAll('[data-paper-status]')];
  const pageSize = 4;
  const pageCount = Math.ceil(papers.length / pageSize);
  if (pageCount <= 1) return;
  let page = 0;
  function render(moveFocus = false) {
    papers.forEach((paper, index) => {
      paper.hidden = index < page * pageSize || index >= (page + 1) * pageSize;
    });
    previous.forEach(button => { button.disabled = page === 0; });
    next.forEach(button => { button.disabled = page === pageCount - 1; });
    statuses.forEach(status => {
      status.textContent = `Page ${page + 1} of ${pageCount} · ${papers.length} publications`;
    });
    if (moveFocus) {
      list.focus({ preventScroll: true });
      list.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }
  list.tabIndex = -1;
  previous.forEach(button => button.addEventListener('click', () => { if (page > 0) { page--; render(true); } }));
  next.forEach(button => button.addEventListener('click', () => { if (page < pageCount - 1) { page++; render(true); } }));
  controls.forEach(control => { control.hidden = false; });
  render();
})();
