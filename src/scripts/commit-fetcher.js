fetch(`https://api.github.com/repos/EvilPiza/Code-Portfolio/commits/main`)
.then(response => response.json())
.then(data => {
    const commit = data;
    
    document.getElementById("latest-commit").innerHTML = `
    <p>Running Commit: <a href="${commit.html_url}" target="_blank">${commit.sha.slice(0, 7)}</a></p>
    `;
})
.catch(error => {
    console.error("Error fetching commit:", error);
    document.getElementById("latest-commit").innerHTML = "Failed to load commit.";
});