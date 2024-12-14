document.getElementById('category').addEventListener('change', function() {
    var category = this.value;
    var banReasonGroup = document.getElementById('ban-reason-group');

    if (category === 'ban-appeal') {
        banReasonGroup.style.display = 'block'; // Show the Ban Appeal textarea
    } else {
        banReasonGroup.style.display = 'none'; // Hide the Ban Appeal textarea
    }
});

// Handle form submission
document.getElementById('support-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting immediately
    
    // Show the thank you message
    document.getElementById('support-form-container').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'block';
    
    // Actually submit the form via Formspree
    this.submit();
});
