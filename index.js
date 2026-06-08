let flag = false;
let innerHight = null;
let returnHight = null;
const introMessage = "There is no spoon.";

function add(){
    $('button').addClass("animated flip");
    setTimeout(function () {
        $("button").removeClass("animated flip");
    }, 2000);
}

function showabout() {
    hideLanding();
    $("#about_container").css("display", "inherit");
    $("#about_container").addClass("animated bounceInLeft");
}

function addArrowGlitch(containerId) {
    const btn = document.querySelector('#' + containerId + ' > div:first-child');
    if (!btn) return;
    btn.classList.add('arrow-glitch');
    setTimeout(() => btn.classList.remove('arrow-glitch'), 420);
}

function scheduleArrowGlitch(containerId) {
    const delay = 100 + Math.random() * 4800;
    setTimeout(() => {
        addArrowGlitch(containerId);
        scheduleArrowGlitch(containerId);
    }, delay);
}

function hideLanding() {
    $('#middle, #footer').addClass('landing-hidden');
    $('#about, #work, #contact').hide();
}

function showLanding() {
    $('#middle, #footer').removeClass('landing-hidden');
    $('#about, #work, #contact').css({
        display: 'flex',
        animationDelay: '0s',
        WebkitAnimationDelay: '0s'
    });
}

function closeabout() {
    addArrowGlitch('about_container');
    $("#about_container").addClass("animated slideOutLeft");
    showLanding();
    setTimeout(function () {
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display", "none");
    }, 100);
}

function showwork() {
    hideLanding();
    $("#work_container").css("display", "inherit");
    $("#work_container").addClass("animated bounceInRight");
}

function closework() {
    addArrowGlitch('work_container');
    $("#work_container").addClass("animated slideOutRight");
    showLanding();
    setTimeout(function () {
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display", "none");
    }, 200);
}

function showcontact() {
    innerHight = window.innerHeight;
    switchFlag();
    hideLanding();
    $("#contact_container").css("display", "inherit");
    $("#contact_container").addClass("animated bounceInUp");
}

function closecontact() {
    addArrowGlitch('contact_container');
    returnHight = window.innerHeight;
    switchFlag();
    preventBug();
    $("#contact_container").addClass("animated slideOutDown");
    showLanding();
    setTimeout(function () {
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display", "none");
    }, 200);
}

function switchFlag() {
    flag = !flag;
}

function preventBug() {
    innerHight === returnHight ? null : window.location.reload(false);
};

function startMatrixIntro() {
    const intro = document.getElementById("matrix_intro");
    const introText = document.getElementById("matrix_intro_text");
    const introWords = introText ? introText.querySelectorAll(".TextGlitch-word") : [];

    if (!intro || !introText || !introWords.length) {
        return;
    }

    const setIntroText = (value) => {
        introWords.forEach((word) => {
            word.textContent = value;
        });
    };

    let index = 0;
    const typingDelay = 35;
    const typingTimer = setInterval(() => {
        setIntroText(introMessage.slice(0, index + 1));
        index += 1;

        if (index >= introMessage.length) {
            clearInterval(typingTimer);
            setTimeout(() => {
                if (typeof TextGlitch === "function") {
                    const introGlitch = new TextGlitch(introText);
                    introGlitch.setTexts([
                        introMessage,
                        "ไม่มีเงินไม่มีน้ำผึ้ง",
                        "こんにちは 界国地球"
                    ]);
                    introGlitch.on();
                    setTimeout(() => {
                        introGlitch.off();
                        intro.classList.add("is-hidden");
                        setTimeout(() => {
                            intro.style.display = "none";
                        }, 800);
                    }, 280);
                    return;
                }

                intro.classList.add("is-hidden");
                setTimeout(() => {
                    intro.style.display = "none";
                }, 800);
            }, 450);
        }
    }, typingDelay);
}

//Martix rain
window.onload = function () {
    startMatrixIntro();
    setTimeout(() => {
        martixRain();
    }, 120);
    scheduleArrowGlitch('about_container');
    scheduleArrowGlitch('work_container');
    scheduleArrowGlitch('contact_container');
};

// Horizontal and vertical window resize events.
(function () {
    var win = jQuery(window),
        prev_width = win.width(),
        prev_height = win.height();
    win.on('resize', function () {
        var width = win.width(),
            height = win.height();

        if (width !== prev_width) {
            win.trigger('hresize');
        }
        if (height !== prev_height) {
            win.trigger('vresize');
        }

        prev_width = width;
        prev_height = height;
    });
})();

$(window).on('hresize', function () {
    window.location.reload(false);
});

$(window).on('vresize', function () {
    if (flag === false) {
        window.location.reload(false)
    }
});

const martixRain = () => {

    const canvas1 = document.getElementById("canvas");
    // The getContext() method returns an object that provides methods and properties for drawing on the canvas.
    const canvasCTX = canvas1.getContext("2d");

    // making the canvas full screen
    canvas1.height = window.innerHeight;
    canvas1.width = window.innerWidth;

    // matrix characters
    let symbol = "¼µ¶±¿ÇÐØĦƔƢǄȡȹɊҖӁ‰＠ξζω□∮〓※∏卐√№↑↓→←↘↙Ψ※㊣∑╳々♀♂∞①ㄨ≡╬";

    // converting the string into an array of single characters - symbol[126]
    symbol = symbol.split("");

    const font_size = 10;
    // number of columns for the rain
    const columns = canvas1.width / font_size;

    // an array of drops - one per column
    let drops = [];

    // initialize all the drops, calculating drops number based on column number
    // setting y coordinates of all drops to 1 initially - [1, 1, 1, 1, 1, 1, 1...]
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // drawing the characters
    function draw() {

        // set the canvas to a translucent black which fills the whole screen
        canvasCTX.fillStyle = "rgba(0, 0, 0, 0.05)";
        // context.fillRect(x, y, width, height);
        canvasCTX.fillRect(0, 0, canvas1.width, canvas1.height);

        // set the text to dark green
        canvasCTX.fillStyle = "#0F0";
        canvasCTX.font = font_size + "px arial";

        // looping over drops
        for (let i = 0; i < drops.length; i++) {

            // retrieve a random character to print
            const text = symbol[Math.floor(Math.random() * symbol.length)];

            // context.fillText(text, x, y, maxWidth);
            canvasCTX.fillText(text, i * font_size, drops[i] * font_size);

            // sending the drop back to the top randomly after it has crossed the screen
            // adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * font_size > canvas1.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // incrementing y coordinate
            drops[i] += 1;

        } // end of for loop

    } // end of draw()

    setInterval(draw, 33);

}

document.getElementById("form").addEventListener("submit", reload);

function reload() {
    closecontact();
   // Get the modal
var modal = document.getElementById("myModal");

  modal.style.display = "block";

    setTimeout(() => {
        document.location.href = "index.html"
    }, 1200)
}

