document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const email = form.elements['email'];
  const username = form.elements['username'];
  const issue = form.elements['issue'];
  const subject = form.elements['subject'];
  const priority = form.elements['priority'];
  const message = form.elements['message'];
  const submitBtn = document.getElementById('submit-btn');
  const checkBtn = document.getElementById('check-btn');
  const loading = document.getElementById('loading');
  const thankYou = document.getElementById('thank-you');

  const emailError = document.getElementById('email-error');
  const usernameError = document.getElementById('username-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Validation regexes
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUser = (v) => /^@.+/.test(v);

  // Track whether CAPTCHA is completed
  let captchaPassed = false;

  // Show or hide error messages and set aria-invalid
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

  // Main form validation + captcha check
  function checkForm() {
    const validEmail = validateField(email, isValidEmail, emailError);
    const validUser = validateField(username, isValidUser, usernameError);
    const validIssue = issue.value.trim() !== '';
    const validSubject = subject.value.trim().length > 0;
    const validMessage = message.value.trim().length > 0;
    const validPriority = priority.value.trim() !== '';

    // Show/hide subject error
    if (!validSubject) {
      subjectError.classList.add('error-visible');
      subject.setAttribute('aria-invalid', 'true');
    } else {
      subjectError.classList.remove('error-visible');
      subject.removeAttribute('aria-invalid');
    }

    // Show/hide message error
    if (!validMessage) {
      messageError.classList.add('error-visible');
      message.setAttribute('aria-invalid', 'true');
    } else {
      messageError.classList.remove('error-visible');
      message.removeAttribute('aria-invalid');
    }

    // Enable submit button only if all valid and captcha passed
    if (
      validEmail &&
      validUser &&
      validIssue &&
      validSubject &&
      validPriority &&
      validMessage &&
      captchaPassed
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Called by reCAPTCHA on successful verification
  window.onCaptchaSuccess = function () {
    captchaPassed = true;
    checkForm();
  };

  // Called by reCAPTCHA when it expires
  window.onCaptchaExpired = function () {
    captchaPassed = false;
    checkForm();
  };

  // Validate on user input
  [email, username, issue, subject, priority, message].forEach((input) => {
    input.addEventListener('input', checkForm);
    input.addEventListener('blur', checkForm);
  });

  // “Check Form” button: forces a validation re-check, alerts if still invalid
  checkBtn.addEventListener('click', () => {
    checkForm();
    if (submitBtn.disabled) {
      alert(
        'Please make sure:\n' +
        '- Email is valid\n' +
        '- Username starts with @\n' +
        '- Request Type is selected\n' +
        '- Subject is not empty\n' +
        '- Priority is selected\n' +
        '- Message is not empty\n' +
        '- CAPTCHA is verified'
      );
    }
  });

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    loading.classList.add('status-visible');

    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
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

  // Initial check
  checkForm();
});
