// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('support-form');
  const email      = form.elements['email'];
  const username   = form.elements['username'];
  const requestType= form.elements['requestType'];
  const subject    = form.elements['subject'];
  const message    = form.elements['message'];
  const submitBtn  = form.querySelector('button[type="submit"]');
  const loading    = document.getElementById('loading');
  const thankYou   = document.getElementById('thank-you');

  // helper to show/hide
  const show = (el, cond) => el.classList.toggle('visible', cond);

  // validators
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validUser  = v => /^@.+/.test(v);

  function validateAll() {
    let ok = validEmail(email.value.trim())
          && validUser(username.value.trim())
          && requestType.value.trim() !== ''
          && subject.value.trim() !== ''
          && message.value.trim() !== ''
          && (grecaptcha && grecaptcha.getResponse().length > 0);

    // toggle individual errors
    show(document.getElementById('email-error'), !validEmail(email.value.trim()));
    show(document.getElementById('username-error'), !validUser(username.value.trim()));
    show(document.getElementById('subject-error'), subject.value.trim()==='');
    show(document.getElementById('message-error'), message.value.trim()==='');

    submitBtn.disabled = !ok;
  }

  // attach live checks
  [email, username, requestType, subject, message].forEach(el => {
    el.addEventListener('input', validateAll);
  });
  requestType.addEventListener('change', validateAll);
  // reCAPTCHA callback must call validateAll
  window.recaptchaCallback = validateAll;
  // fallback: poll captcha state
  setInterval(validateAll, 1000);

  // on submit
  form.addEventListener('submit', async e => {
    e.preventDefault();
    show(loading, true);
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      show(loading, false);
      if (res.ok) {
        form.reset();
        grecaptcha.reset();
        show(thankYou, true);
        setTimeout(() => show(thankYou, false), 7000);
      } else {
        alert('Submission error—please try again.');
        submitBtn.disabled = false;
      }
    } catch {
      show(loading, false);
      alert('Network error—please try later.');
      submitBtn.disabled = false;
    }
  });

  // initial validate
  validateAll();
});
