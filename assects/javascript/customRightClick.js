document.addEventListener("DOMContentLoaded", () => {
    const contextMenu = document.getElementById('custom-context-menu');
      if (contextMenu) {
        // custome right click and diable the developer tool option
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.left = `${event.pageX}px`;
            
            contextMenu.classList.add('visible');
        });
    
        document.addEventListener('click', () => {
            contextMenu.classList.remove('visible');
        });

        // resume downloa
        const downloadButton = document.getElementById("download-Resume");
        if (downloadButton) {
          downloadButton.addEventListener("click", () => {
                const link = document.createElement('a');
                link.href = './assects/resume/MalayBera-Resume-zipfile.zip';
                link.download = 'Malay-Bera_Resume.zip';
                link.click();
          });
        }

        // certificate page
        const certificate = document.getElementById("view-certs");
        if(certificate) {
            certificate.addEventListener('click', ()=> {
                window.location.href = './certificates.html';
            })
        }
        // profile section
        const profile = document.getElementById("view-profile");
        if(profile) {
            profile.addEventListener('click', ()=> {
                window.location.href = './index.html#main';
            })
        }
        // About section
        const About = document.getElementById("view-about");
        if(About) {
            About.addEventListener('click', ()=> {
                window.location.href = './index.html#about';
            })
        }
        // Contact section
        const Contact = document.getElementById("view-contact");
        if(Contact) {
            Contact.addEventListener('click', ()=> {
                window.location.href = './index.html#contact';
            })
        }
      }
});



