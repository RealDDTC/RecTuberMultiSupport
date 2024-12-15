// JavaScript to handle form submission
const form = document.getElementById("support-form");
const thankYouMessage = document.getElementById("thank-you-message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            thankYouMessage.style.display = "block";
        } else {
            alert("There was an error submitting the form. Please try again later.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
    });
});
