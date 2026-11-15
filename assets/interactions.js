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
    setStatus(status, 'The guestbook is not available yet. You can reach me by email.');
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
      wordLimit: [3, 2000],
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
        placeholder: 'Leave a public message. You may leave the display name blank to post as Anonymous.',
      },
    });
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

const form = document.getElementById('contact-form');
if (form) {
  const fields = document.getElementById('contact-form-fields');
  const button = document.getElementById('contact-submit');
  const status = document.getElementById('contact-status');
  const endpoint = serviceUrl(interactionsConfig.contactEndpoint);
  let sending = false;
  let submissionId = null;
  form.addEventListener('input', () => { if (!sending) submissionId = null; });
  if (endpoint) {
    fields.disabled = false;
    setStatus(status, '');
  } else {
    setStatus(status, 'The form is not available yet. Please use the email address above.');
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !endpoint || !form.reportValidity()) return;
    const data = new FormData(form);
    submissionId ||= crypto.randomUUID();
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      company_website: String(data.get('company_website') || ''),
      submissionId,
    };
    if (payload.message.length < 3) {
      setStatus(status, 'Please write a message of at least 3 characters.', true);
      return;
    }
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    setStatus(status, 'Sending your private message…');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'omit',
      });
      if (!response.ok) {
        const error = new Error('Message was not accepted');
        error.status = response.status;
        throw error;
      }
      const result = await response.json();
      if (!['Sent', 'Received'].includes(result.message)) throw new Error('Unexpected server response');
      form.reset();
      submissionId = null;
      setStatus(status, 'Your private message has been sent. Thank you!');
    } catch (error) {
      const message = error.status === 429
        ? 'Please wait a minute before sending another message. Your message has been kept in the form.'
        : 'The message could not be sent. Your text is still here; please try again or use email.';
      setStatus(status, message, true);
    } finally {
      clearTimeout(timer);
      sending = false;
      button.disabled = false;
      button.textContent = 'Send private message';
    }
  });
}
