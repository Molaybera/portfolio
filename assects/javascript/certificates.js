document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const certListContainer = document.getElementById('cert-list-container');
    const scriptContainer = document.getElementById('script-container');
    const terminalBody = document.getElementById('terminal-scroll-area');
    const modal = document.getElementById('cert-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.querySelector('.close-button');
    const certCards = document.querySelectorAll('.cert-card-mini');

    // --- 1. HACKER DECODING EFFECT (HOVER) ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    certCards.forEach(card => {
        const nameElement = card.querySelector('.nameOfCert');
        if (nameElement) {
            const originalText = nameElement.innerText;
            card.addEventListener('mouseenter', () => {
                let iteration = 0;
                clearInterval(card.interval);
                card.interval = setInterval(() => {
                    nameElement.innerText = originalText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) return originalText[index];
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("");
                    if (iteration >= originalText.length) clearInterval(card.interval);
                    iteration += 1 / 2;
                }, 30);
            });
        }
    });

    async function typeNodes(nodes, parentElement, cursor) {
        for (const node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                await typeText(node.textContent, parentElement, cursor);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const newElement = document.createElement(node.tagName);
                
                Array.from(node.attributes).forEach(attr => {
                    newElement.setAttribute(attr.name, attr.value);
                });

                if (cursor && cursor.parentNode === parentElement) {
                    parentElement.insertBefore(newElement, cursor);
                } else {
                    parentElement.appendChild(newElement);
                }
                
                if (node.childNodes.length > 0) {
                    await typeNodes(Array.from(node.childNodes), newElement, null);
                }
            }
        }
    }

    // Helper to type plain text
    function typeText(text, parent, cursor) {
        return new Promise(resolve => {
            let i = 0;
            function typeChar() {
                if (i < text.length) {
                    const char = text.charAt(i);
                    const charNode = document.createTextNode(char);
                    
                    if (cursor && cursor.parentNode === parent) {
                        parent.insertBefore(charNode, cursor);
                    } else {
                        parent.appendChild(charNode);
                    }

                    if(terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;

                    i++;
                    const delay = (char === ' ' || char === '\n') ? 2 : Math.random() * 20 + 5;
                    setTimeout(typeChar, delay);
                } else {
                    resolve();
                }
            }
            typeChar();
        });
    }

    // --- 3. CLICK HANDLER (TRIGGERS TYPING) ---
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const certTitle = card.getAttribute('data-title');
            const certImageSrc = card.getAttribute('data-image-src');
            // Generate random hex ID
            const hexID = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

            // Hide list, show script container
            certListContainer.classList.add('hidden');
            scriptContainer.classList.remove('hidden');
            
            // Add cursor initially
            scriptContainer.innerHTML = '<span class="cursor"></span>';
            const cursor = scriptContainer.querySelector('.cursor');
            const systemLogs = `
<span class="prompt-arrow">&gt;</span> ./view_cert.sh --target="${hexID}"
<span class="log-info">[INFO]</span> Connecting to secure server @ 192.168.0.X...
<span class="log-hex">0x0050: B4 8E 7C 54 8E 00 00 00 8E 00 00 00 0C 00</span>
<span class="log-warn">[WARN]</span> Encrypted packet detected. Decrypting...
<br>
[....................] 0%      .--.
[#####...............] 25%   <|o_o |>
[##########..........] 50%  )=|:++:|=(
[###############.....] 75%   .|:__:|.
[####################] 100%  |_)==(_|
<br>
<span class="log-success">[SUCCESS]</span> Key found: RSA-4096
<span class="log-info">[INFO]</span> Rendering Image Blob: "${certTitle}"...
<span class="log-success">[DONE]</span> Opening Viewer...
            `;

            // Convert HTML string to DOM nodes in memory
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = systemLogs.trim();
            const nodes = Array.from(tempDiv.childNodes);

            // Start Typing
            typeNodes(nodes, scriptContainer, cursor).then(() => {
                // When typing finishes:
                setTimeout(() => {
                    modalImage.src = certImageSrc;
                    modal.classList.remove('hidden');
                    
                 
                    if(modalContent) {
                        modalContent.classList.add('glitch-active');
                        setTimeout(() => {
                            modalContent.classList.remove('glitch-active');
                        }, 500);
                    }
                }, 500);
            });
        });
    });

    // --- 4. CLOSE MODAL LOGIC ---
    function closeModal() {
        modal.classList.add('hidden');
        scriptContainer.classList.add('hidden');
        scriptContainer.innerHTML = ''; 
        certListContainer.classList.remove('hidden'); 
    }

    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }

    // --- 5. CONTEXT MENU LOGIC ---
    const contextMenu = document.getElementById('custom-context-menu');
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.display = 'block';
    });
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });
});