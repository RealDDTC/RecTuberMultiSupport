document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  const inputsToValidate = [
    {
      el: form.elements['email'],
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      errorId: 'email-error'
    },
    {
      el: form.elements['username'],
      validate: v => /^@.+/.test(v),
      errorId: 'username-error'
    },
    {
      el: form.elements['issue'],
      validate: v => v.trim() !== '',
      errorId: 'request-type-error'
    },
    {
      el: form.elements['priority'],
      validate: v => v.trim() !== '',
      errorId: 'priority-error'
    },
    {
      el: form.elements['subject'],
      validate: v => v.trim().length > 0,
      errorId: 'subject-error'
    },
    {
      el: form.elements['message'],
      validate: v => v.trim().length > 0,
      errorId: 'message-error'
    },
  ];

  // Show or hide error message
  function showError(errorId, show) {
    const errorEl = document.getElementById(errorId);
    if (show) {
      errorEl.classList.add('visible');
    } else {
      errorEl.classList.remove('visible');
    }
  }

  // Validate all inputs and update errors
  function validateAll() {
    let allValid = true;
    inputsToValidate.forEach(({ el, validate, errorId }) => {
      const valid = validate(el.value.trim());
      showError(errorId, !valid);
      if (!valid) allValid = false;
    });
    return allValid;
  }

  // Enable or disable submit button based on validity
  function updateSubmitState() {
    submitBtn.disabled = !validateAll();
  }

  // Add input listeners to validate on input
  inputsToValidate.forEach(({ el }) => {
    el.addEventListener('input', updateSubmitState);
  });

  // Show loading and thank you message containers
  const loading = document.getElementById('loading');
  const thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return; // Don't submit if invalid
    }

    loading.classList.add('visible');
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      loading.classList.remove('visible');

      if (res.ok) {
        form.reset();
        thankYou.classList.add('visible');
        submitBtn.disabled = true;
        setTimeout(() => {
          thankYou.classList.remove('visible');
          submitBtn.disabled = false;
          updateSubmitState();
        }, 7000);
      } else {
        alert('Submission error—please try again later.');
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      alert('An unexpected error occurred.');
      loading.classList.remove('visible');
      submitBtn.disabled = false;
    }
  });

  // Initial disable submit until form is valid
  updateSubmitState();
});
