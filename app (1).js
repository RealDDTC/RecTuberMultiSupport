document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('support-form');
  const email      = form.email;
  const username   = form.username;
  const requestType= form.requestType;
  const subject    = form.subject;
  const message    = form.message;
  const submitBtn  = form.querySelector('button');
  const loadingMsg = document.getElementById('loading');
  const thanksMsg  = document.getElementById('thank-you');

  const errEmail   = document.querySelector('#email-error');
  const errUser    = document.querySelector('#username-error');
  const errType    = document.querySelector('#requestType-error');
  const errSubj    = document.querySelector('#subject-error');
  const errMsg     = document.querySelector('#message-error');

  function showErr(el, show) {
    el.style.display = show ? 'block' : 'none';
  }

  function valid() {
    const vEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const vUser  = /^@.+/.test(username.value.trim());
    const vType  = requestType.value.trim() !== '';
    const vSubj  = subject.value.trim() !== '';
    const vMsg   = message.value.trim() !== '';
    const vCap   = window.grecaptcha && grecaptcha.getResponse().length > 0;

    showErr(errEmail, !vEmail);
    showErr(errUser, !vUser);
    showErr(errType, !vType);
    showErr(errSubj, !vSubj);
    showErr(errMsg, !vMsg);

    submitBtn.disabled = !(vEmail && vUser && vType && vSubj && vMsg && vCap);
  }

  [email, username, requestType, subject, message].forEach(inp => {
    inp.addEventListener('input', valid);
  });
  requestType.addEventListener('change', valid);

  window.recaptchaCallback = valid;
  setInterval(valid, 1000);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    loadingMsg.style.display = 'block';
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      loadingMsg.style.display = 'none';
      if (res.ok) {
        form.reset();
        grecaptcha.reset();
        thanksMsg.style.display = 'block';
      } else {
        throw new Error();
      }
    } catch {
      loadingMsg.style.display = 'none';
      alert('Submission error—please try again later.');
    } finally {
      valid();
    }
  });

  valid();
});
