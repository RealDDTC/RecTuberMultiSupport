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
            // Hide the 'Report Player' section for other issue types
            reportPlayerSection.style.display = "none";
        }
    });

    // Optional: Automatically hide the "Report Player" section on page load
    reportPlayerSection.style.display = "none"; // Start with it hidden
});
