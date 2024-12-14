document.addEventListener("DOMContentLoaded", function() {
    // Get the 'Issue Type' select dropdown and the 'Report Player' section
    const issueSelect = document.getElementById("issue");
    const reportPlayerSection = document.getElementById("report-player-section");
    const playerUsernameInput = document.getElementById("player-username");
    const reportPlayerPrompt = document.getElementById("report-player-prompt");

    // Add event listener to the 'Issue Type' dropdown
    issueSelect.addEventListener("change", function() {
        // Check if the selected option is 'Report Player'
        if (issueSelect.value === "Report Player") {
            // Show the 'Report Player' section and the new prompt
            reportPlayerSection.style.display = "block";
            reportPlayerPrompt.style.display = "block";
            // Make the Player's Username field required
            playerUsernameInput.required = true;
        } else {
            // Hide the 'Report Player' section and the new prompt if other option is selected
            reportPlayerSection.style.display = "none";
            reportPlayerPrompt.style.display = "none";
            // Remove the required attribute from Player's Username field
            playerUsernameInput.required = false;
        }
    });

    // Initially hide the "Report Player" section on page load
    reportPlayerSection.style.display = "none";
    reportPlayerPrompt.style.display = "none";
    playerUsernameInput.required = false;
});
