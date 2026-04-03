document.addEventListener('DOMContentLoaded', () => {
  const shutdownDate = new Date('2026-06-01T12:00:00-07:00'); // June 1, 2026 12 PM Pacific
  const now = new Date();

  const livePage = document.getElementById('live-page');
  const shutdownScreen = document.getElementById('shutdown-screen');
  const shutdownBanner = document.getElementById('shutdown-banner');
  const form = document.getElementById('support-form');
  const fileInput = document.getElementById('files');
  const fileListDisplay = document.getElementById('file-list');
  const loadingMsg = document.getElementById('loading');
  const thankYouMsg = document.getElementById('thank-you');

  // Auto shutdown logic
  if (now >= shutdownDate) {
    livePage.style.display = 'none';
    shutdownBanner.style.display = 'none';
    shutdownScreen.style.display = 'block';
    return;
  }

  // File preview
  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    fileListDisplay.innerHTML = files.map(f => `<div>${f.name}</div>`).join('');
  });

  // Form submit with validation
  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    const email = form.email.value.trim();
    const username = form.username.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { valid = false; document.getElementById('email-error').style.display='block'; } else { document.getElementById('email-error').style.display='none'; }
    if (!/^@.+/.test(username)) { valid = false; document.getElementById('username-error').style.display='block'; } else { document.getElementById('username-error').style.display='none'; }

    if (!valid) return;

    loadingMsg.style.display = 'block';
    thankYouMsg.style.display = 'none';

    const formData = new FormData(form);
    fetch(form.action, { method:'POST', body: formData, headers:{ Accept:'application/json' }})
      .then(response => {
        loadingMsg.style.display = 'none';
        if (response.ok) {
          thankYouMsg.style.display = 'block';
          form.reset();
          fileListDisplay.innerHTML='';
          if(window.grecaptcha) grecaptcha.reset();
        } else {
          alert('Submission error. Try again.');
        }
      })
      .catch(() => { loadingMsg.style.display = 'none'; alert('Network error. Check your connection.'); });
  });
});
