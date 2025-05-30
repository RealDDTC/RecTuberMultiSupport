document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('support-form');
  const submitButton = form.querySelector('button[type="submit"]');

  const requiredFields = ['email', 'username', 'issue', 'priority', 'message'];

  const validate = () => {
    let allFilled = requiredFields.every(id => {
      const el = document.getElementById(id);
      return el && el.value.trim() !== '';
    });

    const email = document.getElementById('email');
    const username = document.getElementById('username');

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const isValidUsername = username.value.startsWith('@');

    document.getElementById('email-error').style.display = isValidEmail ? 'none' : 'block';
    document.getElementById('username-error').style.display = isValidUsername ? 'none' : 'block';

    if (!isValidEmail || !isValidUsername) {
      allFilled = false;
    }

    submitButton.disabled = !allFilled;
  };

  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', validate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('loading').style.display = 'block';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      document.getElementById('loading').style.display = 'none';
      if (response.ok) {
        document.getElementById('thank-you').style.display = 'block';
        form.reset();
        submitButton.disabled = true;
      } else {
        alert('There was an issue submitting your request. Please try again.');
      }
    }).catch(() => {
      document.getElementById('loading').style.display = 'none';
      alert('There was an issue submitting your request. Please try again.');
    });
  });
});
