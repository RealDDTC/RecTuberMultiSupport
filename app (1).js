document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const email = form.elements['email'];
  const username = form.elements['username'];
  const issue = form.elements['issue'];
  const priority = form.elements['priority'];
  const message = form.elements['message'];
  const submitBtn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const thankYou = document.getElementById('thank-you');

  const emailError = document.getElementById('email-error');
  const usernameError = document.getElementById('username-error');

  // Validation regexes
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUser = (v) => /^@.+/.test(v);

  // Track captcha state
  let captchaPassed = false;

  // Show or hide error messages and aria-invalid attribute
  function validateField(field, validator, errorEl) {
    const valid = validator(field.value.trim());
    if (!valid) {
      errorEl.classList.add('error-visible');
      field.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.classList.remove('error-visible');
      field.removeAttribute('aria-invalid');
    }
    return valid;
  }

  // Check all validations and captcha to enable submit
  function checkForm() {
    const validEmail = validateField(email, isValidEmail, emailError);
    const validUser = validateField(username, isValidUser, usernameError);
    const validIssue = issue.value !== '';
    const validPriority = priority.value !== '';
    const validMessage = message.value.trim().length > 0;

    if (validEmail && validUser && validIssue && validPriority && validMessage && captchaPassed) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Event listeners for inputs
  [email, username, issue, priority, message].forEach(input =>
    input.addEventListener('input', checkForm)
  );

  // reCAPTCHA callback for success
  window.onCaptchaSuccess = function () {
    captchaPassed = true;
    checkForm();
  };

  // Optional: reset captcha state on expiration
  window.onCaptchaExpired = function () {
    captchaPassed = false;
    checkForm();
  };

  // Form submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    loading.classList.add('status-visible');

    // Send data via Formspree (fetch)
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => {
        loading.classList.remove('status-visible');
        if (response.ok) {
          thankYou.classList.add('status-visible');
          form.reset();
          submitBtn.disabled = true;
          captchaPassed = false;
          grecaptcha.reset();
        } else {
          alert('Oops! There was a problem submitting your request. Please try again.');
          submitBtn.disabled = false;
        }
      })
      .catch(() => {
        loading.classList.remove('status-visible');
        alert('Network error. Please check your connection and try again.');
        submitBtn.disabled = false;
      });
  });
});
