document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('support-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const reportPlayerLink = document.querySelector('.report-player-link');
    const recRoomUsernameField = document.getElementById('rec-room-username');

    form.addEventListener('submit', function (event) {
        // Validate Rec Room username
        const recRoomUsername = recRoomUsernameField.value;
        if (!recRoomUsername.includes('@')) {
            event.preventDefault(); // Prevent form submission
            alert('Please make sure your Rec Room username contains the @ symbol.');
            return;
        }

        // Hide form and show thank you message
        event.preventDefault(); // Prevent default form submission
        form.style.display = 'none'; // Hide the form
        thankYouMessage.style.display = 'block'; // Show the thank you message
    });

    // Optional: Add a listener to handle when a report player link is clicked, although it redirects by default.
    reportPlayerLink.addEventListener('click', function () {
        window.location.href = "https://recroom.zendesk.com/hc/en-us/requests/new";
    });
});
