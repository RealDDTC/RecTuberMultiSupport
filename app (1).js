document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const formWrapper = document.querySelector('.form-wrapper');
    const categorySelect = document.getElementById('category');
    const banReasonGroup = document.getElementById('ban-reason-group');
    const playerUsernameGroup = document.getElementById('player-username-group');
    const fileInput = document.getElementById('file');

    // Handle category selection and show/hide dynamic fields
    categorySelect.addEventListener('change', function () {
        if (this.value === 'ban-appeal') {
            banReasonGroup.style.display = 'block';
            playerUsernameGroup.style.display = 'none';
        } else if (this.value === 'report-player') {
            playerUsernameGroup.style.display = 'block';
            banReasonGroup.style.display = 'none';
        } else {
            banReasonGroup.style.display = 'none';
            playerUsernameGroup.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show thank you message and hide form
        formWrapper.style.display = 'none';
        thankYouMessage.style.display = 'block';

        // Submit form data to Formspree
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                console.log('Form successfully submitted');
            } else {
                console.error('Error in form submission');
            }
        })
        .catch(error => {
            console.error('Error submitting form: ', error);
        });
    });
});
