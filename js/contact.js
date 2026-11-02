(() => {
  const form = document.querySelector('#contact-form');
  const button = form.querySelector('button[type="submit"]');
  const endpoint = form.getAttribute('data-endpoint') || '';
  const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
  button.disabled = false;
  let sending = false;
  const status = document.querySelector('#contact-status');
  const fields = ['name', 'email', 'phone', 'message'].map(id => document.getElementById(id));

  function validationMessage(field) {
    const value = field.value.trim();
    if (!value) return `Please enter your ${field.id === 'name' ? 'name' : field.id === 'email' ? 'email address' : field.id === 'phone' ? 'phone number' : 'message'}.`;
    if (field.maxLength > 0 && value.length > field.maxLength) return `Use no more than ${field.maxLength} characters.`;
    if (field.id === 'email' && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) return 'Enter a valid email address, such as name@example.com.';
    if (field.id === 'phone' && !/^[0-9]+$/.test(value)) return 'Use digits only, without +, spaces, or punctuation.';
    return '';
  }

  function showError(field, message) {
    document.getElementById(`${field.id}-error`).textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  fields.forEach(field => {
    field.addEventListener('input', () => {
      status.textContent = '';
      if (field.hasAttribute('aria-invalid')) showError(field, validationMessage(field));
    });
    field.addEventListener('blur', () => {
      if (field.value || field.hasAttribute('aria-invalid')) showError(field, validationMessage(field));
    });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    status.textContent = '';
    let firstInvalid;
    fields.forEach(field => {
      const message = validationMessage(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Please correct the highlighted fields.';
      firstInvalid.focus();
      return;
    }
    // Keep phone numbers as strings so that leading zeros are preserved.
    fields.forEach(field => { field.value = field.value.trim(); });
    if (!configured) {
      status.textContent = 'Message delivery is being connected. Please use the email link to contact Joshua for now. No message has been sent.';
      return;
    }
    sending = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    // Send a snapshot; preserve the original text if the request fails.
    const payload = Object.fromEntries(fields.map(field => [field.id, field.value]));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    fields.forEach(field => { field.readOnly = true; });
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        status.textContent = response.status === 429
          ? 'The message service is busy. Please try later or use the email link. Your text is still here.'
          : 'Your message could not be sent. Please try again or use the email link. Your text is still here.';
        return;
      }
      form.reset();
      status.textContent = 'Thank you. Your message has been accepted for delivery to Joshua.';
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'Delivery confirmation timed out. Your message may have arrived; use the email link if needed. Your text is still here.'
        : 'Delivery could not be confirmed. Please check your connection or use the email link. Your text is still here.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      fields.forEach(field => { field.readOnly = false; });
      button.disabled = false;
      button.textContent = 'Send message →';
      form.removeAttribute('aria-busy');
    }
  });
})();
