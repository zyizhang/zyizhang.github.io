import { interactionsConfig } from './interactions-config.js';

function serviceUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url : null;
  } catch { return null; }
}

function setStatus(element, message, error = false) {
  element.textContent = message;
  element.dataset.error = String(error);
}

async function loadGuestbook() {
  const container = document.getElementById('guestbook-comments');
  const status = document.getElementById('guestbook-status');
  if (!container || !status) return;
  const server = serviceUrl(interactionsConfig.commentsServer);
  if (!server) {
    setStatus(status, 'The message board is not available yet. You can reach me by email.');
    return;
  }
  setStatus(status, 'Loading messages…');
  try {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://unpkg.com/@waline/client@3.16.2/dist/waline.css';
    document.head.append(stylesheet);
    const { init } = await import('https://unpkg.com/@waline/client@3.16.2/dist/waline.js');
    init({
      el: container,
      serverURL: server.href.replace(/\/$/, ''),
      path: '/guestbook/',
      lang: 'en',
      dark: 'html[data-theme="dark"]',
      meta: ['nick'],
      requiredMeta: [],
      login: 'disable',
      pageSize: 5,
      commentSorting: 'latest',
      wordLimit: 2000,
      emoji: [],
      search: false,
      imageUploader: false,
      highlighter: false,
      texRenderer: false,
      pageview: false,
      comment: false,
      reaction: false,
      locale: {
        nick: 'Display name',
        anonymous: 'Anonymous',
        placeholder: 'Share a thought or say hello…',
      },
    });
    // Waline has no name-placeholder option. Apply it to each mounted editor,
    // including editors created later for replies, without changing saved names.
    const showAnonymousPlaceholder = () => {
      container.querySelectorAll('input[name="nick"]').forEach(input => {
        input.placeholder = 'Anonymous';
      });
    };
    showAnonymousPlaceholder();
    const editorObserver = new MutationObserver(showAnonymousPlaceholder);
    editorObserver.observe(container, { childList: true, subtree: true });
    setStatus(status, '');
  } catch {
    setStatus(status, 'Messages could not be loaded. Please try again later or contact me by email.', true);
  }
}

const guestbook = document.getElementById('guestbook');
if (guestbook && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      loadGuestbook();
    }
  }, { rootMargin: '250px' });
  observer.observe(guestbook);
} else {
  loadGuestbook();
}
