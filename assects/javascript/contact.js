    const MY_EMAIL = "molaybera299@gmail.com"; 

    // 1. Handle Execute Send Animation
    document.getElementById('EmailLink').addEventListener('click', function(e) {
        e.preventDefault(); // Stop immediate redirection
        
        const overlay = document.getElementById('loadingOverlay');
        const progressBar = document.getElementById('progressBar');
        const logOutput = document.getElementById('logOutput');
        
        // Show Overlay
        overlay.style.display = 'flex';
        
        // Simulation Variables
        let width = 0;
        const totalTime = 5000; // 5 seconds total load time
        const intervalTime = 20;
        const increment = 100 / (totalTime / intervalTime);

        // Hacker Logs
        const logs = [
            "Handshaking with server...",
            "Encrypting payload (AES-256)...",
            "Bypassing firewalls...",
            "Uploading packets...",
            "Transmission Complete."
        ];

        const timer = setInterval(() => {
            width += increment;
            
            // Randomize speed slightly for "realism"
            if(Math.random() > 0.8) width += 2;
            
            // Update Bar
            progressBar.style.width = Math.min(width, 100) + '%';

            // Update Text based on percentage
            if(width < 20) logOutput.innerText = logs[0];
            else if(width < 40) logOutput.innerText = logs[1];
            else if(width < 60) logOutput.innerText = logs[2];
            else if(width < 80) logOutput.innerText = logs[3];
            else logOutput.innerText = logs[4];

            // Finish
            if (width >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    // --- CHANGED LOGIC HERE ---
                    // Mobile (width <= 500): Open app
                    // Desktop: Open Gmail Website
                    if (window.innerWidth <= 500) {
                        window.location.href = `mailto:${MY_EMAIL}`;
                    } else { 
                        // fs=1 opens in fullscreen compose mode
                        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${MY_EMAIL}`, '_blank');
                    }
                    
                    // Reset overlay after a moment (optional)
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        progressBar.style.width = '0%';
                    }, 1000);
                }, 500);
            }
        }, intervalTime);
    });

    // 2. Handle Copy Address
    document.getElementById('copyEmailBtn').addEventListener('click', function() {
        // Create temporary element to copy from
        const tempInput = document.createElement('input');
        tempInput.value = MY_EMAIL;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Visual Feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> COPIED!';
        this.style.borderColor = '#00ff41'; // Green border
        this.style.color = '#00ff41';
        
        // Add Pulse Animation
        this.classList.add('pulse-animation');

        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.borderColor = ''; // Reset
            this.style.color = '';
            this.classList.remove('pulse-animation');
        }, 2000);
    });