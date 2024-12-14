document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const reportPlayerLink = document.querySelector('.report-player-link');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        form.style.display = 'none'; // Hide the form
        thankYouMessage.style.display = 'block'; // Show the thank you message
    });

    // Optional: Add a listener to handle when a report player link is clicked, although it redirects by default.
    reportPlayerLink.addEventListener('click', function () {
        window.location.href = "https://recroom.zendesk.com/hc/en-us/requests/new";
    });
});
