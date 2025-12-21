document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Nav Bar Slide Down
    gsap.from('.nav',{
        y:-100,
        duration:2,
    });

    // Logo Slide Down
    gsap.from('#my-logo',{
        y:-100,
        opacity:0,
        duration:2
    });

    // "Hello, I'm..." Text Animation
    var tl = gsap.timeline();
    tl.from('#hello',{
        y:-100,
        duration:1,
        opacity:0,
        stagger:0.5
    });
    tl.from('#my',{
        y:200,
        duration:1,
        opacity:0,
        stagger:0.5
    });
    tl.from('#name',{
        x:200,
        duration:1,
        opacity:0,
        stagger:0.5
    });

    // --- 2. RESTORED TEXT TYPING ANIMATION ---
    const textElement = document.getElementById('main-text');
    const texts = ["Not an Error", "Learner", "Editor", "Programmer", "Web Developer"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;

    function type() {
        if (currentCharIndex < texts[currentTextIndex].length) {
            textElement.textContent += texts[currentTextIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(type, 100); // Typing speed
        } else {
            setTimeout(erase, 1500); // Wait before erasing
        }
    }

    function erase() {
        if (currentCharIndex > 0) {
            textElement.textContent = textElement.textContent.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(erase, 50); // Erasing speed
        } else {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(type, 200); // Wait before typing next word
        }
    }
    // Start the loop
    if(textElement) type();


    // --- 3. FUNCTIONALITY ---

    // Copy Email Function
    const copyBtn = document.getElementById("copyEmailBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("molaybera299@gmail.com");
            copyBtn.textContent = "Email Copied!";
            setTimeout(() => {
                copyBtn.textContent = "Copy Email Address";
            }, 2000);
        });
    }
    
    // Responsive Email Link
    const email = "molaybera299@gmail.com";
    const emailLink = document.getElementById('EmailLink');
    if (emailLink) {
        if(window.innerWidth <= 500) {
            emailLink.href = `mailto:${email}`;
            emailLink.removeAttribute("target");
        } else { 
            emailLink.href =`https://mail.google.com/mail/?view=cm&to=${email}`;
        }
    }
});