document.addEventListener("DOMContentLoaded", () => {
    const API_BASE = "https://discord-fetcher.onrender.com";

    // Hardcoding for life <3
    const userId = "1182505210418053171";

    // fetches the goods
    fetch(`${API_BASE}/discord/user/${userId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }
            return res.json();
        })
        .then(data => {
            const pfpDiv = document.getElementById("discord-pfp");
            const bannerDiv = document.getElementById("discord-banner");
            const usernameDiv = document.getElementById("discord-username");

            pfpDiv.innerHTML = "";
            bannerDiv.innerHTML = "";
            usernameDiv.innerHTML = "";
            
            if (data.avatarUrl) {
                pfpDiv.innerHTML = `
                    <img
                        src="${data.avatarUrl}"
                        alt="Profile"
                        class="w-32 h-32 rounded-full object-cover shadow-xl border-red-900 border-4"
                    >
                `;
            }

            if (data.bannerUrl) {
                bannerDiv.innerHTML = `
                    <img
                        src="${data.bannerUrl}"
                        alt="Banner"
                        class="w-full h-full object-cover"
                    >
                `;
            }

            if (data.username) {
                usernameDiv.innerHTML = `
                <i class="fab fa-discord text-3xl"></i>
                <h1 class="font-bold">@${data.username}</h1>`;
            }

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