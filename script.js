/* =====================================
   ENVELOPE
===================================== */

const envelopeButton =
    document.getElementById("open-envelope");

const envelope =
    document.querySelector(".envelope");

const welcomeScreen =
    document.getElementById("welcome-screen");

const mainContent =
    document.getElementById("main-content");


envelopeButton.addEventListener(
    "click",
    openBirthday
);


function openBirthday() {

    envelope.classList.add("open");


    setTimeout(() => {

        welcomeScreen.classList.add("opened");

    }, 700);


    setTimeout(() => {

        welcomeScreen.style.display = "none";

        mainContent.classList.remove("hidden");

        startScrollAnimations();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1400);

}



/* =====================================
   SCROLL ANIMATIONS
===================================== */

function startScrollAnimations() {

    const sections =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    sections.forEach(section => {

        observer.observe(section);

    });

}



/* =====================================
   MUSIC PLAYER
===================================== */

const audio =
    document.getElementById("birthday-song");


const playButton =
    document.getElementById("play-button");


const progress =
    document.getElementById("progress");


const progressContainer =
    document.getElementById("progress-container");


const currentTimeText =
    document.getElementById("current-time");


const durationText =
    document.getElementById("duration");



playButton.addEventListener(
    "click",
    async () => {


        try {


            if (audio.paused) {


                await audio.play();


                playButton.textContent =
                    "❚❚";


            }


            else {


                audio.pause();


                playButton.textContent =
                    "▶";


            }


        }


        catch (error) {


            console.error(
                "Audio error:",
                error
            );


            alert(
                "There was a problem playing the song."
            );


        }


    }
);



audio.addEventListener(
    "loadedmetadata",
    () => {


        durationText.textContent =
            formatTime(audio.duration);


    }
);



audio.addEventListener(
    "timeupdate",
    () => {


        if (!audio.duration) {

            return;

        }


        const percentage =

            (
                audio.currentTime
                /
                audio.duration
            )

            * 100;


        progress.style.width =
            percentage + "%";


        currentTimeText.textContent =
            formatTime(
                audio.currentTime
            );


    }
);



audio.addEventListener(
    "ended",
    () => {


        playButton.textContent =
            "▶";


        progress.style.width =
            "0%";


    }
);



progressContainer.addEventListener(
    "click",
    event => {


        if (!audio.duration) {

            return;

        }


        const rectangle =

            progressContainer
                .getBoundingClientRect();


        const clickedPosition =

            event.clientX
            -
            rectangle.left;


        const percentage =

            clickedPosition
            /
            rectangle.width;


        audio.currentTime =

            percentage
            *
            audio.duration;


    }
);



function formatTime(seconds) {


    if (!Number.isFinite(seconds)) {

        return "0:00";

    }


    const minutes =

        Math.floor(
            seconds / 60
        );


    const remainingSeconds =

        Math.floor(
            seconds % 60
        );


    return (

        minutes

        +

        ":"

        +

        remainingSeconds
            .toString()
            .padStart(2, "0")

    );

}



/* =====================================
   MEMORY ALBUM

   CHANGE TITLES / CAPTIONS HERE
===================================== */

const memories = [


    {

        photo:
            "assets/photos/photo1.jpg",

        title:
            "The day we met ♡",

        caption:
            "Out of all the random days that could have passed like any other day, I'm glad this one didn't. Because somehow, this was the beginning of us."

    },


    {

        photo:
            "assets/photos/photo2.jpg",

        title:
            "Where it all started",

        caption:
            "Neither of us probably knew what was coming next. And maybe that's what makes it special. We just met... and somehow life kept giving us reasons to stay."

    },


    {

        photo:
            "assets/photos/photo3.jpg",

        title:
            "The completely normal moments",

        caption:
            "Not every good memory needs some huge story behind it. Sometimes it's just us talking about absolutely nothing, laughing at something stupid and me thinking — yeah, I like this."

    },


    {

        photo:
            "assets/photos/photo4.jpg",

        title:
            "IT Engineer for a day 😂",

        caption:
            "Mechanical Engineer by degree. IT Engineer because of you. At least now you can't say I've never made an effort to understand your world."

    },


    {

        photo:
            "assets/photos/photo5.jpg",

        title:
            "Through everything",

        caption:
            "One thing I appreciate more than I probably say enough is that you've been there through every kind of situation. That means more to me than you know."

    },


    {

        photo:
            "assets/photos/photo6.jpg",

        title:
            "More memories loading... ♡",

        caption:
            "This isn't really the last memory. We still have a lot of places to go, pictures to take, stupid jokes to make and memories to create. To be continued..."

    }


];



let memoryIndex =
    0;


const memoryPhoto =
    document.getElementById(
        "memory-photo"
    );


const memoryNumber =
    document.getElementById(
        "memory-number"
    );


const memoryTitle =
    document.getElementById(
        "memory-title"
    );


const memoryCaption =
    document.getElementById(
        "memory-caption"
    );


const previousButton =
    document.getElementById(
        "previous-photo"
    );


const nextButton =
    document.getElementById(
        "next-photo"
    );


const dotsContainer =
    document.getElementById(
        "carousel-dots"
    );


const polaroid =
    document.querySelector(
        ".polaroid"
    );



/* CREATE DOTS */

function createDots() {


    memories.forEach(
        (memory, index) => {


            const dot =
                document.createElement(
                    "div"
                );


            dot.classList.add(
                "dot"
            );


            if (index === 0) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {


                    memoryIndex =
                        index;


                    showMemory();


                }
            );


            dotsContainer
                .appendChild(dot);


        }
    );

}



/* SHOW MEMORY */

function showMemory() {


    polaroid.classList.add(
        "changing"
    );


    setTimeout(() => {


        const memory =
            memories[
                memoryIndex
            ];


        memoryPhoto.src =
            memory.photo;


        memoryTitle.textContent =
            memory.title;


        memoryCaption.textContent =
            memory.caption;


        memoryNumber.textContent =

            `MEMORY ${String(

                memoryIndex + 1

            ).padStart(2, "0")}`;



        document
            .querySelectorAll(".dot")
            .forEach(
                (dot, index) => {


                    dot.classList.toggle(

                        "active",

                        index === memoryIndex

                    );


                }
            );


        polaroid.classList.remove(
            "changing"
        );


    }, 220);

}



/* NEXT */

nextButton.addEventListener(
    "click",
    () => {


        memoryIndex++;


        if (
            memoryIndex
            >=
            memories.length
        ) {


            memoryIndex =
                0;


        }


        showMemory();


    }
);



/* PREVIOUS */

previousButton.addEventListener(
    "click",
    () => {


        memoryIndex--;


        if (
            memoryIndex
            <
            0
        ) {


            memoryIndex =
                memories.length - 1;


        }


        showMemory();


    }
);



createDots();



/* =====================================
   PHONE SWIPE
===================================== */

let touchStartX =
    0;


let touchEndX =
    0;



polaroid.addEventListener(
    "touchstart",
    event => {


        touchStartX =

            event.changedTouches[0]
                .screenX;


    }
);



polaroid.addEventListener(
    "touchend",
    event => {


        touchEndX =

            event.changedTouches[0]
                .screenX;


        handleSwipe();


    }
);



function handleSwipe() {


    const distance =

        touchStartX
        -
        touchEndX;


    if (distance > 50) {


        nextButton.click();


    }


    if (distance < -50) {


        previousButton.click();


    }

}



/* =====================================
   THREE WISH CARDS
===================================== */

const wishCards =

    document.querySelectorAll(
        ".wish-card"
    );


const openedWishes =

    new Set();


const finalCard =

    document.getElementById(
        "final-card"
    );



wishCards.forEach(
    card => {


        card.addEventListener(
            "click",
            () => {


                card.classList.add(
                    "flipped"
                );


                openedWishes.add(

                    card.dataset.wish

                );


                if (
                    openedWishes.size
                    ===
                    3
                ) {


                    finalCard
                        .classList
                        .remove(
                            "final-locked"
                        );


                    finalCard
                        .classList
                        .add(
                            "final-unlocked"
                        );


                }


            }
        );


    }
);



/* =====================================
   FINAL LETTER
===================================== */

const letterButton =

    document.getElementById(
        "letter-button"
    );


const letterModal =

    document.getElementById(
        "letter-modal"
    );


const closeLetter =

    document.getElementById(
        "close-letter"
    );



letterButton.addEventListener(
    "click",
    () => {


        if (
            openedWishes.size
            <
            3
        ) {


            alert(

                "You still have some birthday wishes to open first ♡"

            );


            return;


        }


        letterModal
            .classList
            .add("open");


        document.body.style.overflow =
            "hidden";


        createConfetti();


    }
);



closeLetter.addEventListener(
    "click",
    closeBirthdayLetter
);



letterModal.addEventListener(
    "click",
    event => {


        if (
            event.target
            ===
            letterModal
        ) {


            closeBirthdayLetter();


        }


    }
);



function closeBirthdayLetter() {


    letterModal
        .classList
        .remove("open");


    document.body.style.overflow =
        "auto";


}



/* =====================================
   CONFETTI
===================================== */

function createConfetti() {


    const container =

        document.getElementById(
            "confetti-container"
        );


    const symbols = [

        "♡",

        "♥",

        "✿",

        "✨",

        "🌸"

    ];



    for (
        let i = 0;
        i < 45;
        i++
    ) {


        const confetti =

            document.createElement(
                "div"
            );


        confetti
            .classList
            .add(
                "confetti"
            );


        confetti.textContent =

            symbols[

                Math.floor(

                    Math.random()
                    *
                    symbols.length

                )

            ];



        confetti.style.left =

            Math.random()
            *
            100
            +
            "vw";



        confetti.style.animationDuration =

            3
            +
            Math.random()
            *
            4
            +
            "s";



        confetti.style.fontSize =

            12
            +
            Math.random()
            *
            18
            +
            "px";



        container
            .appendChild(
                confetti
            );



        setTimeout(
            () => {


                confetti.remove();


            },
            7000
        );


    }

}