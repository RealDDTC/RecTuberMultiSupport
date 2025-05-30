document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('support-form');
  const email     = form.elements['email'];
  const username  = form.elements['username'];
  const issue     = form.elements['issue'];
  const message   = form.elements['message'];
  const submitBtn = form.querySelector('button[type="submit"]');
  const loading   = document.getElementById('loading');
  const thankYou  = document.getElementById('thank-you');

  // Toggle visibility via .visible
  const toggle = (el, show) => el.classList.toggle('visible', show);

  // Validation regexes
  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUser  = v => /^@.+/.test(v);

  // Debounced validation
  function attachValidation(field, validator, errorEl) {
    let timer;
    field.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const valid = validator(field.value.trim());
        toggle(errorEl, !valid);
        field.setAttribute('aria-invalid', !valid);
        checkForm();
      }, 300);
    });
  }

  // Enable submit only when valid
  function checkForm() {
    const ok = isValidEmail(email.value.trim())
            && isValidUser(username.value.trim())
            && issue.value.trim().length > 0
            && message.value.trim().length > 0
            && form.elements['priority'].value;
    submitBtn.disabled = !ok;
  }

  // Handle submit
  form.addEventListener('submit', async e => {
    e.preventDefault();
    toggle(loading, true);
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      toggle(loading, false);
      if (res.ok) {
        form.reset();
        toggle(thankYou, true);
        setTimeout(() => toggle(thankYou, false), 5000);
      } else {
        alert('Submission error—please try again later.');
      }
    } catch (err) {
      console.error(err);
      toggle(loading, false);
      alert('An unexpected error occurred.');
    } finally {
      checkForm();
    }
  });

  // initialize
  attachValidation(email, isValidEmail, document.getElementById('email-error'));
  attachValidation(username, isValidUser, document.getElementById('username-error'));
  checkForm();
});
