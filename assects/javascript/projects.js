document.addEventListener("DOMContentLoaded", () => {
    const loadBtn = document.getElementById('load-more-btn');
    let currentlyShown = 3;
    const projectsPerClick = 3

    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const hiddenProjects = document.querySelectorAll('.hidden-project');
            
            // If no more hidden projects, stop here
            if (hiddenProjects.length === 0) return;

            loadBtn.innerText = ">> DECRYPTING_DATA...";
            loadBtn.style.opacity = "0.7";

            setTimeout(() => {
                // Reveal only the next batch
                for (let i = 0; i < projectsPerClick; i++) {
                    if (hiddenProjects[i]) {
                        hiddenProjects[i].classList.remove('hidden-project');
                        hiddenProjects[i].style.display = 'block'; 
                    }
                }

                // Reset button
                loadBtn.innerText = "[ LOAD_ADDITIONAL_DATA ]";
                loadBtn.style.opacity = "1";

                // If no more hidden projects exist after this batch, hide the button
                if (document.querySelectorAll('.hidden-project').length === 0) {
                    loadBtn.style.display = 'none';
                }
            }, 600);
        });
    }
});