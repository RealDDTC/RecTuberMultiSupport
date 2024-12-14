document.addEventListener('DOMContentLoaded', function() {
    const issueDropdown = document.getElementById('issue');
    const reportPlayerSection = document.getElementById('report-player-section');
    const usernameField = document.getElementById('player-username'); // Report Player username field

    // Toggle the visibility of the "Report Player" section based on dropdown selection
    issueDropdown.addEventListener('change', function() {
        const issueType = this.value;
        if (issueType === 'Report Player') {
            reportPlayerSection.style.display = 'block'; // Show the Report Player section
        } else {
            reportPlayerSection.style.display = 'none'; // Hide the Report Player section
            usernameField.value = ''; // Clear username field when section is hidden
        }
    });

    // Handle form submission (e.g., thank you message)
    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Show the "Thank You" message
        thankYouMessage.style.display = 'block';

        // Reset the form fields after submission
        form.reset();

        // Scroll to the thank you message
        window.scrollTo({
            top: thankYouMessage.offsetTop,
            behavior: 'smooth'
        });
    });
});
