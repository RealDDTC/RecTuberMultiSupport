const form = document.getElementById('supportForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);

  fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      alert('Your message has been sent!');
      form.reset();
    } else {
      alert('There was an error, please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error, please try again.');
  });
});
