document.addEventListener('DOMContentLoaded', () => {
  const shutdownDate = new Date('2026-06-01T12:00:00-07:00');
  const now = new Date();

  const livePage = document.getElementById('live-page');
  const shutdownScreen = document.getElementById('shutdown-screen');
  const form = document.getElementById('support-form');
  const fileInput = document.getElementById('files');
  const fileListDisplay = document.getElementById('file-list');

  if (now >= shutdownDate) {
    livePage.style.display = 'none';
    shutdownScreen.style.display = 'block';
    return;
  }

  fileInput.addEventListener('change', () => {
    const files = Array.from(fileInput.files);
    fileListDisplay.innerHTML = files.map(f => `<div>${f.name}</div>`).join('');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert('Support request submitted successfully.');
        form.reset();
        fileListDisplay.innerHTML = '';
      } else {
        alert('Submission error. Try again.');
      }
    })
    .catch(() => alert('Network error. Check your connection.'));
  });
});
