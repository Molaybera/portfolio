document.addEventListener("DOMContentLoaded", () => {
    const contextMenu = document.getElementById('custom-context-menu');

    // --- 1. CONTEXT MENU LOGIC ---
    if (contextMenu) {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let x = event.clientX;
            let y = event.clientY;
            const menuWidth = contextMenu.offsetWidth || 220;
            const menuHeight = contextMenu.offsetHeight || 200;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            if (x + menuWidth > windowWidth) {
                x = x - menuWidth; 
            }

            if (y + menuHeight > windowHeight) {
                y = y - menuHeight;
            }

            contextMenu.style.left = `${x}px`;
            contextMenu.style.top = `${y}px`;

            contextMenu.classList.add('visible');
        });

        document.addEventListener('click', () => {
            if (contextMenu.classList.contains('visible')) {
                contextMenu.classList.remove('visible');
            }
        });
    }

    
    // Download Resume Logic
    const downloadButton = document.getElementById("download-Resume");
    if (downloadButton) {
        downloadButton.addEventListener("click", () => {
            const link = document.createElement('a');
            link.href = './assects/resume/MalayBera-Resume-zipfile.zip';
            link.download = 'MalayBera-Resume-zipfile.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const setupNavigation = (elementId, targetUrl) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', () => {
                window.location.href = targetUrl;
            });
        }
    };

    // Initialize Navigation
    setupNavigation("view-certs", './certificates.html');
    setupNavigation("view-profile", './index.html#main');
    setupNavigation("view-about", './index.html#about');
    setupNavigation("view-projects", './index.html#projects'); 
    setupNavigation("view-contact", './index.html#contact');
});