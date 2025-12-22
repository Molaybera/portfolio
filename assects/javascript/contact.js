    const MY_EMAIL = "molaybera299@gmail.com"; 
    
    // Select elements
    const overlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('progressBar');
    const logOutput = document.getElementById('logOutput');
    const forceCloseBtn = document.getElementById('forceCloseBtn');

    // 1. EXECUTE SEND Logic
    document.getElementById('EmailLink').addEventListener('click', function(e) {
        e.preventDefault(); 
        
        // Force display with !important equivalent
        overlay.style.setProperty('display', 'flex', 'important');
        
        let width = 0;
        const totalTime = 2500; 
        const intervalTime = 20;
        const increment = 100 / (totalTime / intervalTime);

        const logs = [
            "Handshaking with server...",
            "Encrypting payload (AES-256)...",
            "Bypassing firewalls...",
            "Uploading packets...",
            "Transmission Complete."
        ];

        // Clear any existing intervals if user clicks fast
        if (window.uploadTimer) clearInterval(window.uploadTimer);

        window.uploadTimer = setInterval(() => {
            width += increment;
            if(Math.random() > 0.8) width += 2; // Random jumps for realism
            
            progressBar.style.width = Math.min(width, 100) + '%';

            if(width < 20) logOutput.innerText = logs[0];
            else if(width < 40) logOutput.innerText = logs[1];
            else if(width < 60) logOutput.innerText = logs[2];
            else if(width < 80) logOutput.innerText = logs[3];
            else logOutput.innerText = logs[4];

            if (width >= 100) {
                clearInterval(window.uploadTimer);
                
                // REDIRECT LOGIC
                setTimeout(() => {
                    if (window.innerWidth <= 500) {
                        window.location.href = `mailto:${MY_EMAIL}`;
                    } else { 
                        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${MY_EMAIL}`, '_blank');
                    }
                    
                    // Cleanup for desktop (Mobile often freezes here)
                    setTimeout(resetOverlay, 1000);
                }, 500);
            }
        }, intervalTime);
    });

    // 2. BACK BUTTON FIX (bfcache)
    // This runs when user returns to page from mail app
    window.addEventListener('pageshow', function(event) {
        if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
            resetOverlay();
        }
    });

    // 3. Helper to Reset Overlay
    function resetOverlay() {
        overlay.style.display = 'none';
        progressBar.style.width = '0%';
        logOutput.innerText = "Initializing protocols...";
    }

    // 4. Manual Close Button (Just in case)
    forceCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent bubbling
        if (window.uploadTimer) clearInterval(window.uploadTimer);
        resetOverlay();
    });

    // 5. COPY ADDRESS Logic
    document.getElementById('copyEmailBtn').addEventListener('click', function() {
        const tempInput = document.createElement('input');
        tempInput.value = MY_EMAIL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> COPIED!';
        this.style.borderColor = '#00ff41';
        this.style.color = '#00ff41';
        this.classList.add('pulse-animation');

        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.borderColor = ''; 
            this.style.color = '';
            this.classList.remove('pulse-animation');
        }, 2000);
    });