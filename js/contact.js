(() => {
  const form = document.querySelector('#contact-form');
  form.querySelector('button[type="submit"]').disabled = false;
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

  form.addEventListener('submit', event => {
    event.preventDefault();
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
    status.textContent = 'Your details passed validation. This is a local demonstration; no message has been sent. Use the email link to contact Joshua.';
  });
})();
