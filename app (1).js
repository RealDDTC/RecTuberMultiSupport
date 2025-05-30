document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("support-form");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const message = document.getElementById("message");
  const loading = document.getElementById("loading");
  const thankYou = document.getElementById("thank-you");

  // Error messages
  const emailError = document.getElementById("email-error");
  const usernameError = document.getElementById("username-error");

  form.addEventListener("submit", function (e) {
    let isValid = true;
    emailError.classList.remove("visible");
    usernameError.classList.remove("visible");

    // Validate email
    if (!email.value || !email.checkValidity()) {
      emailError.classList.add("visible");
      isValid = false;
    }

    // Validate username pattern
    if (!username.value.startsWith("@")) {
      usernameError.classList.add("visible");
      isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      alert("Please enter a message.");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }

    // Show loading message
    loading.classList.add("visible");
  });

  // Handle thank-you message after submission
  if (window.location.hash === "#thank-you") {
    thankYou.classList.add("visible");
  }
});
