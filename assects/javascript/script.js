document.addEventListener("DOMContentLoaded", function() {
    // maim text
    gsap.registerPlugin(ScrollTrigger);
    if (window.innerWidth > 425) {
      gsap.from('#main h1', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '#main h1',
          scroller: 'body',
          markers: false,
          start: 'top 58%',
          end: 'top 40%',
          scrub: 1,
        },
      });
    } else {
      gsap.from('#main h1', {
        opacity: 1,
      });
    }
    // nav
    gsap.from('.nav',{
        y:-100,
        duration:2,
    });
    // logo
    gsap.from('#my-logo',{
        y:-100,
        opacity:0,
        duration:2
    });
    // upperContainer
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
    // profile img
    gsap.from('.ProfileImg', {
        duration: 3,
        y:200,
        opacity: 0,
        delay:0.5,
        stagger: 0.5,
        onComplete: () => {
            // onces the animation is completed then make transition back
            setTimeout(()=>{
            document.querySelector('#main img').style.transition='all 0.7s';
            },50)
        }
    });

    // main text changing process
    const textElement = document.getElementById('main-text');
    const texts = ["Not an Error","Learner", "Editer","programmer","web developer"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    function type() {
        if (currentCharIndex < texts[currentTextIndex].length) {
            textElement.textContent += texts[currentTextIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(type, 100); // Adjust typing speed here
        } else {
            setTimeout(erase, 500); // Pause before erasing
        }
    }
    function erase() {
        if (currentCharIndex > 0) {
            textElement.textContent = textElement.textContent.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(erase, 50); // Adjust erasing speed here
        } else {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(type, 200); // Pause before typing next text
        }
    }
    type();

    // copying the email funciton
    const copyBtn = document.getElementById("copyEmailBtn");
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("molaybera299@gmail.com");
        copyBtn.textContent = "Email Copied!";
        setTimeout(() => {
            copyBtn.textContent = "Copy Email Address";
        }, 2000);
    });
    
    //when the screen size is less then 500 then change the web mail to app mail
    const email = "molaybera299@gmail.com";
    const emailLink = document.getElementById('EmailLink');
    if(window.innerWidth <= 500) {
        emailLink.href = `mailto:${email}`;
        emailLink.removeAttribute("target");
    } else { 
        emailLink.href =`https://mail.google.com/mail/?view=cm&to=${email}`;
    
    }
});


