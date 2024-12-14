document.addEventListener("DOMContentLoaded", function() {
    // Get the 'Issue Type' select dropdown and the 'Report Player' section
    const issueSelect = document.getElementById("issue");
    const reportPlayerSection = document.getElementById("report-player-section");

    // Add event listener to the 'Issue Type' dropdown
    issueSelect.addEventListener("change", function() {
        // Check if the selected option is 'Report Player'
        if (issueSelect.value === "Report Player") {
            // Show the 'Report Player' section
            reportPlayerSection.style.display = "block";
        } else {
            // Hide it if the selected issue type is not 'Report Player'
            reportPlayerSection.style.display = "none";
        }
    });

    // Optional: Automatically hide the "Report Player" section when the page loads
    reportPlayerSection.style.display = "none"; // Hide on page load
});
