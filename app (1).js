// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('support-form');
  const email     = form.elements['email'];
  const username  = form.elements['username'];
  const submitBtn = form.querySelector('button[type="submit"]');
  const loading   = document.getElementById('loading');
  const thanks    = document.getElementById('thank-you-message');

  // Simple show/hide via CSS class
  const toggle = (el, show) => el.classList.toggle('visible', show);

  // Validation rules
  const rules = {
    email:    v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    username: v => /^@.+/.test(v),
  };

  // Debounced validation
  const attachValidation = (fieldName) => {
    const field = form.elements[fieldName];
    const error = document.getElementById(`${fieldName}-error`);
    let timer;

    field.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const valid = rules[fieldName](field.value.trim());
        toggle(error, !valid);
        field.setAttribute('aria-invalid', !valid);
        checkForm();
      }, 300);
    });
  };

  // Enable submit when all valid
  const checkForm = () => {
    const ok = Object.keys(rules).every(name =>
      rules[name](form.elements[name].value.trim())
    );
    submitBtn.disabled = !ok;
  };

  // Handle submission
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
        toggle(thanks, true);
        setTimeout(() => toggle(thanks, false), 5000);
      } else {
        alert('Error submitting form—please try again later.');
      }
    } catch (err) {
      console.error(err);
      toggle(loading, false);
      alert('Unexpected error—please try again.');
    } finally {
      checkForm();
    }
  });

  // Init
  attachValidation('email');
  attachValidation('username');
  checkForm();
});
