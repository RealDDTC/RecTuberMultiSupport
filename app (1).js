document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('support-form');
  const email     = form.elements['email'];
  const username  = form.elements['username'];
  const submitBtn = form.querySelector('button[type="submit"]');
  const loading   = document.getElementById('loading');
  const thanks    = document.getElementById('thank-you-message');

  // Toggle visibility
  const toggle = (el, show) => el.classList.toggle('visible', show);

  // Validation rules
  const rules = {
    email:    v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
    username: v => /^@.+/.test(v),
  };

  // Attach real-time, debounced validation
  const attachValidation = (name) => {
    const field = form.elements[name];
    const error = document.getElementById(`${name}-error`);
    let timer;
    field.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const valid = rules[name](field.value.trim());
        toggle(error, !valid);
        field.setAttribute('aria-invalid', !valid);
        checkForm();
      }, 300);
    });
  };

  // Enable submit only when valid
  const checkForm = () => {
    const allValid = Object.keys(rules)
      .every(name => rules[name](form.elements[name].value.trim()));
    submitBtn.disabled = !allValid;
  };

  // Handle form submission
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

  // Initialize
  attachValidation('email');
  attachValidation('username');
  checkForm();
});
