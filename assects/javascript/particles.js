document.addEventListener("DOMContentLoaded", function(){
    /* Particles */
    if(document.getElementById('particles-js')){
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00a6ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00a6ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1 }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": false, "mode": "repulse" }, 
                    "onclick": { "enable": false, "mode": "push" }
                }
            }
        });
    }
});