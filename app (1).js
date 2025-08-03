document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const submitBtn = document.getElementById('submit-btn');

  // All input/select/textarea fields to validate
  const fields = {
    email: form.elements['email'],
    username: form.elements['username'],
    issue: form.elements['issue'],
    subject: form.elements['subject'],
    priority: form.elements['priority'],
    message: form.elements['message'],
  };

  const errors = {
    email: document.getElementById('email-error'),
    username: document.getElementById('username-error'),
    issue: document.getElementById('issue-error'),
    subject: document.getElementById('subject-error'),
    priority: document.getElementById('priority-error'),
    message: document.getElementById('message-error'),
  };

  // Validation regexes
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    username: (v) => /^@.+/.test(v),
    issue: (v) => v !== "",
    subject: (v) => v.trim() !== "",
    priority: (v) => v !== "",
    message: (v) => v.trim() !== "",
  };

  function validateField(name) {
    const value = fields[name].value.trim();
    const valid = validators[name](value);
    if (!valid) {
      errors[name].classList.add('error-visible');
      fields[name].setAttribute('aria-invalid', 'true');
    } else {
      errors[name].classList.remove('error-visible');
      fields[name].removeAttribute('aria-invalid');
    }
    return valid;
  }

  function validateForm() {
    let formIsValid = true;
    for (const name in fields) {
      if (!validateField(name)) {
        formIsValid = false;
      }
    }
    return formIsValid;
  }

  // On input, hide error if valid now
  for (const name in fields) {
    fields[name].addEventListener('input', () => validateField(name));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus the first invalid field for UX
      for (const name in fields) {
        if (fields[name].getAttribute('aria-invalid') === 'true') {
          fields[name].focus();
          break;
        }
      }
      return;
    }

    // Show loading
    document.getElementById('loading').classList.add('status-visible');
    document.getElementById('thank-you').classList.remove('status-visible');

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        document.getElementById('loading').classList.remove('status-visible');
        if (response.ok) {
          document.getElementById('thank-you').classList.add('status-visible');
          form.reset();
          // Reset captcha if you use it
          if (window.grecaptcha) {
            grecaptcha.reset();
          }
        } else {
          alert('Oops! There was a problem submitting your request. Please try again.');
        }
      })
      .catch(() => {
        document.getElementById('loading').classList.remove('status-visible');
        alert('Network error. Please check your connection and try again.');
      });
  });
});
