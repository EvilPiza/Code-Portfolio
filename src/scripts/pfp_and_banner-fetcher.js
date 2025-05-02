document.addEventListener("DOMContentLoaded", () => {
    const API_BASE = "https://discord-fetcher.onrender.com";

    // Example: Replace this with dynamic user ID input
    const userId = "924380186609328199"; // Replace with the actual user ID

    // Fetch Discord user data
    fetch(`${API_BASE}/discord/user/${userId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }
            return res.json();
        })
        .then(data => {
            const pfpDiv = document.getElementById("pfp");
            const bannerDiv = document.getElementById("banner");

            // Clear previous content
            pfpDiv.innerHTML = "";
            bannerDiv.innerHTML = "";

            // Add avatar if available
            if (data.avatarUrl) {
                pfpDiv.innerHTML = `
                    <img
                        src="${data.avatarUrl}"
                        alt="Profile"
                        class="w-32 h-32 rounded-full object-cover shadow-xl border-red-900 border-4"
                    >
                `;
            }

            // Add banner if available
            if (data.bannerUrl) {
                bannerDiv.innerHTML = `
                    <img
                        src="${data.bannerUrl}"
                        alt="Banner"
                        class="w-full h-full object-cover"
                    >
                `;
            }

            // Handle case where neither avatar nor banner is available
            if (!data.avatarUrl && !data.bannerUrl) {
                bannerDiv.innerHTML = "No avatar or banner found.";
            }
        })
        .catch(error => {
            console.error("Error fetching Discord user data:", error);
            const bannerDiv = document.getElementById("result");
            bannerDiv.innerHTML = "Failed to load Discord user data.";
        });
});