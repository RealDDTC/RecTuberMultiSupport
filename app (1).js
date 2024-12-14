
// Handling form submission for additional checks (like validation)
document.getElementById('support-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // You can add more client-side validation here if needed
    console.log("Form Submitted");

    // Submit form using AJAX or let the browser submit to Formspree
    this.submit();
});
