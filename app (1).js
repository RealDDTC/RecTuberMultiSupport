// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const form         = document.getElementById('support-form');
  const emailField   = form.elements['email'];
  const userField    = form.elements['username'];
  const submitBtn    = form.querySelector('button[type="submit"]');
  const loadingEl    = document.getElementById('loading');
  const thanksEl     = document.getElementById('thank-you-message');

  // Utility: show/hide element by toggling a class
  const toggle = (el, show) => {
    el.classList.toggle('visible', show);
  };

  // Validation functions
  const validators = {
    email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    username: (value) => /^@.+/.test(value),
  };

  // Attach real-time validation with simple debounce
  const attachValidation = (fieldName) => {
    const field = form.elements[fieldName];
    const error = document.getElementById(`${fieldName}-error`);
    let timeoutId;

    field.addEventListener('input', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const valid = validators[fieldName](field.value.trim());
        toggle(error, !valid);
        field.setAttribute('aria-invalid', !valid);
        checkFormValidity();
      }, 300);
    });
  };

  // Disable submit until all fields pass validation
  const checkFormValidity = () => {
    const allValid = Object.keys(validators).every(name =>
      validators[name](form.elements[name].value.trim())
    );
    submitBtn.disabled = !allValid;
  };

  // Form submission handler
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    toggle(loadingEl, true);
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      toggle(loadingEl, false);

      if (response.ok) {
        form.reset();
        toggle(thanksEl, true);
        setTimeout(() => toggle(thanksEl, false), 5000);
      } else {
        alert('Error submitting form — please try again later.');
      }
    } catch (err) {
      toggle(loadingEl, false);
      console.error(err);
      alert('Unexpected error — please try again.');
    } finally {
      checkFormValidity();
    }
  };

  // Initialization
  attachValidation('email');
  attachValidation('username');
  form.addEventListener('submit', handleSubmit);
  checkFormValidity();
});
