document.addEventListener("DOMContentLoaded", function() {
    // Get the 'Issue Type' select dropdown
    const issueSelect = document.getElementById("issue");

    // Add event listener to the 'Issue Type' dropdown
    issueSelect.addEventListener("change", function() {
        // If "Report Player" is selected, redirect to the RecRoom support page
        if (issueSelect.value === "Report Player (Redirect)") {
            window.location.href = "https://recroom.zendesk.com/hc/en-us/requests/new"; // Redirect to RecRoom support page
        }
    });
});
