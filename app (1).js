document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('support-form');
  const email     = form.elements['email'];
  const username  = form.elements['username'];
  const requestType = form.elements['requestType'];
  const priority  = form.elements['priority'];
  const subject   = form.elements['subject'];
  const message   = form.elements['message'];
  const submitBtn = form.querySelector('button[type="submit"]');
  const loading   = document.getElementById('loading');
  const thankYou  = document.getElementById('thank-you');

  // Toggle visibility via .visible
  const toggle = (el, show) => el.classList.toggle('visible', show);

  // Validation regexes
  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidUser  = v => /^@.+/.test(v);

  // Show/hide error message helper
  function showError(el, condition) {
    el.classList.toggle('visible', condition);
  }

  // Validate individual fields & show errors
  function validateEmail() {
    const valid = isValidEmail(email.value.trim());
    email.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('email-error'), !valid);
    return valid;
  }
  function validateUsername() {
    const valid = isValidUser(username.value.trim());
    username.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('username-error'), !valid);
    return valid;
  }
  function validateRequestType() {
    const valid = requestType.value !== "";
    requestType.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('requestType-error'), !valid);
    return valid;
  }
  function validatePriority() {
    const valid = priority.value !== "";
    priority.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('priority-error'), !valid);
    return valid;
  }
  function validateSubject() {
    const valid = subject.value.trim().length > 0;
    subject.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('subject-error'), !valid);
    return valid;
  }
  function validateMessage() {
    const valid = message.value.trim().length > 0;
    message.setAttribute('aria-invalid', !valid);
    showError(document.getElementById('message-error'), !valid);
    return valid;
  }

  // Check entire form validity to toggle submit button
  function updateSubmitState() {
    const formIsValid =
      validateEmail() &&
      validateUsername() &&
      validateRequestType() &&
      validatePriority() &&
      validateSubject() &&
      validateMessage();
    submitBtn.disabled = !formIsValid;
  }

  // Attach input event listeners to fields for real-time validation
  [
    email, username, requestType, priority, subject, message
  ].forEach(field => {
    field.addEventListener('input', () => updateSubmitState());
  });

  // Handle form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Final check before submission
    if (submitBtn.disabled) return;

    toggle(loading, true);
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      toggle(loading, false);

      if (response.ok) {
        form.reset();
        toggle(thankYou, true);
        submitBtn.disabled = true;
        setTimeout(() => toggle(thankYou, false), 7000);
      } else {
        alert("Oops! There was a problem submitting your request.");
        submitBtn.disabled = false;
      }
    } catch (error) {
      toggle(loading, false);
      alert("Network error. Please try again later.");
      submitBtn.disabled = false;
    }
  });

  // Initial state
  updateSubmitState();
});
