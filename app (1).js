document.addEventListener('DOMContentLoaded', function() {
    // Handle the visibility of the "Report Player" section
    const issueDropdown = document.getElementById('issue');
    const reportPlayerSection = document.getElementById('report-player-section');
    const usernameField = document.getElementById('player-username'); // Username input field for Report Player

    issueDropdown.addEventListener('change', function() {
        const issueType = this.value;
        if (issueType === 'Report Player') {
            reportPlayerSection.style.display = 'block'; // Show the Report Player section
        } else {
            reportPlayerSection.style.display = 'none'; // Hide the Report Player section
            usernameField.value = ''; // Reset the username field when section is hidden
        }
    });

    // Handle the form submission and show the thank-you message
    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // You can add more validation here if needed

        // Show the thank you message
        thankYouMessage.style.display = 'block';

        // Clear the form fields after submission
        form.reset();

        // Scroll to the thank you message
        window.scrollTo({
            top: thankYouMessage.offsetTop,
            behavior: 'smooth'
        });
    });
});
