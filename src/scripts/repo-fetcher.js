async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/EvilPiza/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        
        // Display only non-forked repositories
        const filteredRepos = repos.filter(repo => !repo.fork).slice(0, 6);
        
        if (filteredRepos.length === 0) {
            projectsContainer.innerHTML = `
                <div class="col-span-3 text-center py-8">
                    <i class="fas fa-exclamation-circle text-red-600 text-4xl mb-4"></i>
                    <p class="text-gray-400">No public repositories found.</p>
                </div>
            `;
            return;
        }
        
        filteredRepos.forEach((repo, index) => {
            const repoCard = document.createElement('div');
            repoCard.className = `fade-in delay-${index % 3 + 1}`;
            repoCard.style.animationPlayState = 'paused';
            
            // Format the description to remove GitHub emoji codes
            let description = repo.description || 'No description provided';
            description = description.replace(/:[a-z_]+:/g, '');
            
            repoCard.innerHTML = `
                <div class="bg-gray-800 rounded-lg overflow-hidden h-full card-hover border border-gray-700 transition duration-300 glow">
                    <div class="p-6 h-full flex flex-col">
                        <div class="flex items-center mb-4">
                            <i class="fab fa-github text-red-600 mr-3 text-xl"></i>
                            <h3 class="text-xl font-bold text-white truncate">${repo.name}</h3>
                        </div>
                        <p class="text-gray-400 mb-4 flex-grow">${description}</p>
                        <div class="flex justify-between items-center text-sm text-gray-500">
                            <span class="flex items-center">
                                <i class="fas fa-code-branch mr-1"></i>
                                ${repo.language || 'N/A'}
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-star mr-1"></i>
                                ${repo.stargazers_count}
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-eye mr-1"></i>
                                ${repo.watchers_count}
                            </span>
                        </div>
                        <div class="mt-4">
                            <a href="${repo.html_url}" target="_blank" class="inline-block w-full text-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 transform hover:scale-105">
                                View Project
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(repoCard);
            
            // Observe the new element for scroll animation
            const fadeInObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        fadeInObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            fadeInObserver.observe(repoCard);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        document.getElementById('projects-container').innerHTML = `
            <div class="col-span-3 text-center py-8">
                <i class="fas fa-exclamation-triangle text-red-600 text-4xl mb-4"></i>
                <p class="text-gray-400">Failed to load projects. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubRepos();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    window.addEventListener('scroll', function() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
});