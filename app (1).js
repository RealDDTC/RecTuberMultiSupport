// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Select the form element
    const form = document.getElementById('support-form');

    // Listen for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission behavior

        // Get the form data
        const formData = new FormData(form);

        // Show a loading message
        const submitButton = form.querySelector('input[type="submit"]');
        submitButton.value = 'Sending...';
        submitButton.disabled = true;

        // Send the form data to Formspree
        fetch('https://formspree.io/f/xkgnalkk', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Success message
                alert('Your request has been submitted successfully!');
                form.reset();
            } else {
                // Error message
                alert('There was an error, please try again.');
            }
        })
        .catch(error => {
            alert('There was an error, please try again.');
        })
        .finally(() => {
            submitButton.value = 'Submit';
            submitButton.disabled = false;
        });
    });
});
