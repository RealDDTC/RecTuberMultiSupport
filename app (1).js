// Real-time email validation
const emailField = document.getElementById("email");
const emailError = document.getElementById("email-error");

emailField.addEventListener("input", function() {
    const email = emailField.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }
});

// Real-time username validation
const usernameField = document.getElementById("username");
const usernameError = document.getElementById("username-error");

usernameField.addEventListener("input", function() {
    const username = usernameField.value;
    if (!username.startsWith("@")) {
        usernameError.style.display = "block";
    } else {
        usernameError.style.display = "none";
    }
});

// Form submission handling
const form = document.getElementById("support-form");
const thankYouMessage = document.getElementById("thank-you-message");
const loadingMessage = document.getElementById("loading");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the loading spinner
    loadingMessage.style.display = "block";

    // Create FormData from the form
    const formData = new FormData(form);

    // Send the form data using fetch
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        loadingMessage.style.display = "none";  // Hide the loading spinner

        if (response.ok) {
            // Reset the form and display the thank-you message
            form.reset();
            thankYouMessage.style.display = "block";

            // Hide the thank-you message after 5 seconds
            setTimeout(() => {
                thankYouMessage.style.display = "none";
            }, 5000);
        } else {
            alert("There was an error submitting the form. Please try again later.");
        }
    })
    .catch(error => {
        loadingMessage.style.display = "none";  // Hide the loading spinner
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
    });
});
