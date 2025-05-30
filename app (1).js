document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const email = form.email;
  const username = form.username;
  const requestType = form.requestType;
  const subject = form.subject;
  const message = form.message;
  const submitBtn = form.querySelector('button[type="submit"]');

  const errorEmail = document.getElementById('email-error');
  const errorUsername = document.getElementById('username-error');
  const errorRequestType = document.getElementById('requestType-error');
  const errorSubject = document.getElementById('subject-error');
  const errorMessage = document.getElementById('message-error');

  const loadingMsg = document.getElementById('loading');
  const thankYouMsg = document.getElementById('thank-you');

  // Show/hide helper
  const toggleError = (element, condition) => {
    if (condition) element.style.display = 'block';
    else element.style.display = 'none';
  };

  // Validation helpers
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidUsername = (username) =>
    /^@.+/.test(username);

  // Validate entire form, enable submit if all valid and reCAPTCHA completed
  function validateForm() {
    const validEmail = isValidEmail(email.value.trim());
    const validUsername = isValidUsername(username.value.trim());
    const validRequestType = requestType.value.trim() !== '';
    const validSubject = subject.value.trim().length > 0;
    const validMessage = message.value.trim().length > 0;
    const recaptchaResponse = grecaptcha.getResponse().length > 0;

    toggleError(errorEmail, !validEmail);
    toggleError(errorUsername, !validUsername);
    toggleError(errorRequestType, !validRequestType);
    toggleError(errorSubject, !validSubject);
    toggleError(errorMessage, !validMessage);

    submitBtn.disabled = !(validEmail && validUsername && validRequestType && validSubject && validMessage && recaptchaResponse);
  }

  // Validate on input
  [email, username, requestType, subject, message].forEach(el => {
    el.addEventListener('input', validateForm);
    el.addEventListener('blur', validateForm);
  });

  // recaptcha callback
  window.recaptchaCallback = () => {
    validateForm();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingMsg.style.display = 'block';
    thankYouMsg.style.display = 'none';
    submitBtn.disabled = true;

    // Prepare FormData
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        loadingMsg.style.display = 'none';
        thankYouMsg.style.display = 'block';
        form.reset();
        grecaptcha.reset();
        submitBtn.disabled = true;
      } else {
        throw new Error('Network response was not OK');
      }
    } catch (error) {
      loadingMsg.style.display = 'none';
      alert('There was an error submitting the form. Please try again.');
      submitBtn.disabled = false;
    }
  });

  // Initial validation in case form is pre-filled
  validateForm();
});
