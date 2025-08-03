document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const submitBtn = document.getElementById('submit-btn');
  const checkBtn = document.getElementById('check-btn');
  const loading = document.getElementById('loading');
  const thankYou = document.getElementById('thank-you');

  const fields = {
    email: {
      el: form.elements['email'],
      error: document.getElementById('email-error'),
      validate: v => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
    },
    username: {
      el: form.elements['username'],
      error: document.getElementById('username-error'),
      validate: v => /^@.+/.test(v),
    },
    issue: {
      el: form.elements['issue'],
      validate: v => v !== '',
    },
    subject: {
      el: form.elements['subject'],
      error: document.getElementById('subject-error'),
      validate: v => v.trim() !== '',
    },
    priority: {
      el: form.elements['priority'],
      validate: v => v !== '',
    },
    message: {
      el: form.elements['message'],
      error: document.getElementById('message-error'),
      validate: v => v.trim() !== '',
    }
  };

  let captchaPassed = false;

  function validateAll() {
    let allValid = true;

    for (const key in fields) {
      const field = fields[key];
      const value = field.el.value.trim();
      const valid = field.validate(value);
      if (field.error) {
        field.error.classList.toggle('error-visible', !valid);
        field.el.setAttribute('aria-invalid', !valid);
      }
      if (!valid) allValid = false;
    }

    submitBtn.disabled = !(allValid && captchaPassed);
    return allValid;
  }

  window.onCaptchaSuccess = () => {
    captchaPassed = true;
    validateAll();
  };

  window.onCaptchaExpired = () => {
    captchaPassed = false;
    validateAll();
  };

  Object.values(fields).forEach(f => {
    f.el.addEventListener('input', validateAll);
    f.el.addEventListener('blur', validateAll);
  });

  checkBtn.addEventListener('click', () => {
    const valid = validateAll();
    if (!valid || !captchaPassed) {
      alert(
        'Please check:\n- Valid email\n- Username starts with @\n- All required fields filled\n- CAPTCHA completed'
      );
    } else {
      alert('✅ Form looks good and is ready to submit!');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateAll();
    submitBtn.disabled = true;
    loading.classList.add('status-visible');

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }).then(response => {
      loading.classList.remove('status-visible');
      if (response.ok) {
        thankYou.classList.add('status-visible');
        form.reset();
        captchaPassed = false;
        submitBtn.disabled = true;
        grecaptcha.reset();
      } else {
        alert('There was a problem submitting your request.');
        submitBtn.disabled = false;
      }
    }).catch(() => {
      loading.classList.remove('status-visible');
      alert('Network error. Please try again.');
      submitBtn.disabled = false;
    });
  });

  validateAll();
});
