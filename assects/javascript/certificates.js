document.addEventListener('DOMContentLoaded', () => {
    const certListContainer = document.getElementById('cert-list-container');
    const scriptContainer = document.getElementById('script-container');
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.querySelector('.close-button');
    const certCards = document.querySelectorAll('.cert-card-mini');

    function closeModal() {
        modal.classList.add('hidden');
        scriptContainer.classList.add('hidden');
        certListContainer.classList.remove('hidden');
        scriptContainer.innerHTML = '';
    }

    function simulateTyping(text, onComplete) {
        let i = 0;
        scriptContainer.innerHTML = '';
        const intervalId = setInterval(() => {
            if (i < text.length) {
                scriptContainer.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(intervalId);
                if (onComplete) onComplete();
            }
        }, 30);
    }

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const certTitle = card.getAttribute('data-title');
            const certImageSrc = card.getAttribute('data-image-src');
            certListContainer.classList.add('hidden');
            scriptContainer.classList.remove('hidden');
            const scriptText = `> ./view_cert.sh --name="${certTitle}"
[INFO] Initializing image renderer...
[INFO] Fetching resource from remote repository...
[SUCCESS] Render complete. Displaying image now.
> `;
            simulateTyping(scriptText, () => {
                setTimeout(() => {
                    modalImage.src = certImageSrc;
                    modal.classList.remove('hidden');
                }, 500);
            });
        });
    });

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});