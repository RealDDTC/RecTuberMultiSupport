document.addEventListener("DOMContentLoaded", function () {
    // Get references to the form and the thank you message elements
    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const supportFormContainer = document.querySelector('.form-container');

    // Handle the category change for Ban Appeal visibility
    const categorySelect = document.getElementById('category');
    const banReasonGroup = document.getElementById('ban-reason-group');

    categorySelect.addEventListener('change', function() {
        if (this.value === 'ban-appeal') {
            banReasonGroup.style.display = 'block'; // Show the Ban Appeal textarea
        } else {
            banReasonGroup.style.display = 'none'; // Hide the Ban Appeal textarea
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Show the thank you message
        supportFormContainer.style.display = 'none';
        thankYouMessage.style.display = 'block';

        // Submit the form via Formspree
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                console.log("Form successfully submitted!");
            } else {
                console.error("Form submission failed");
            }
        })
        .catch(error => {
            console.error("Error submitting the form: ", error);
        });
    });
});
