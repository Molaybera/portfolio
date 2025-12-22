document.addEventListener("DOMContentLoaded", function() {
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
});