document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const email = form.elements['email'];
  const username = form.elements['username'];
  const issue = form.elements['issue'];
  const subject = form.elements['subject'];
  const priority = form.elements['priority'];
  const message = form.elements['message'];
  const submitBtn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const thankYou = document.getElementById('thank-you');

  const emailError = document.getElementById('email-error');
  const usernameError = document.getElementById('username-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Validation functions
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUser = (v) => /^@.+/.test(v);
  let captchaPassed = false;

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

  function checkForm() {
    const validEmail = validateField(email, isValidEmail, emailError);
    const validUser = validateField(username, isValidUser, usernameError);
    const validIssue = issue.value !== '';
    const validSubject = subject.value.trim() !== '';
    const validMessage = message.value.trim() !== '';
    const validPriority = priority.value !== '';

    if (!validSubject) {
      subjectError.classList.add('error-visible');
      subject.setAttribute('aria-invalid', 'true');
    } else {
      subjectError.classList.remove('error-visible');
      subject.removeAttribute('aria-invalid');
    }

    if (!validMessage) {
      messageError.classList.add('error-visible');
      message.setAttribute('aria-invalid', 'true');
    } else {
      messageError.classList.remove('error-visible');
      message.removeAttribute('aria-invalid');
    }

    submitBtn.disabled = !(validEmail && validUser && validIssue && validSubject && validPriority && validMessage && captchaPassed);
  }

  window.onCaptchaSuccess = () => {
    captchaPassed = true;
    checkForm();
  };

  window.onCaptchaExpired = () => {
    captchaPassed = false;
    checkForm();
  };

  // Validate on input and blur
  [email, username, issue, subject, priority, message].forEach((input) => {
    input.addEventListener('input', checkForm);
    input.addEventListener('blur', checkForm);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    loading.classList.add('status-visible');
    thankYou.classList.remove('status-visible');

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

  checkForm();
});
