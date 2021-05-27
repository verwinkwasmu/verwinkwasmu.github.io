function init() {
    AOS.init({
        offset: 350,
        duration: 3000 // values from 0 to 3000, with step 50ms

    });

    function playSound() {
        var sound = document.getElementById("audio");
        sound.play();
    }

    

    const links = document.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', playSound, false);
    }
    

    const buttonGrp = document.getElementsByClassName("btn");

    for (var i = 0; i < buttonGrp.length; i++) {
        buttonGrp[i].addEventListener('click', playSound, false);
    }

    mybutton = document.getElementById("myBtn");
    mybutton.addEventListener('click', playSound, false);
    
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
    });

    function triggerEmail() {

        document.getElementById('contact-form').addEventListener('submit', function (event) {
            event.preventDefault();

            // these IDs from the previous steps
            emailjs.sendForm('service_f1511xx', 'template_lyrk0r9', this)
                .then(function () {
                    document.getElementById("alert").innerHTML = `<div class="alert alert-success d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>
    Message successfully sent! I will get back to you shortly. Thank you! 😄
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

                }, function (error) {
                    document.getElementById("alert").innerHTML = `<div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
    Message was not successfully sent. Please try again 😞
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
                });
        });
    }
    triggerEmail();
}


const swup = new Swup()
init();
swup.on('contentReplaced', init);