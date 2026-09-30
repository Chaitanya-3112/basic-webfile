/* ================= THEME ================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("myTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "🌙";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "myTheme",
        isLight ? "light" : "dark"
    );

    themeToggle.textContent =
        isLight ? "🌙" : "☀️";

});


/* ================= MOBILE MENU ================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    menuToggle.textContent =
        navMenu.classList.contains("active")
            ? "✕"
            : "☰";

});


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.textContent = "☰";

        });

    });


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(".counter");


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.ceil(target / 80);


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats-section");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },

        {
            threshold: 0.4
        }

    );


statsObserver.observe(statsSection);


/* ================= FAQ ================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        faqItems.forEach(other => {

            other.classList.remove("active");

            other.querySelector(
                ".faq-answer"
            ).style.maxHeight = null;

        });


        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* ================= CONTACT FORM ================= */

const form =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


form.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        return;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        return;

    }


    formMessage.textContent =
        "✓ Message validated successfully!";


    form.reset();

});


/* ================= BACK TO TOP ================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= CUSTOM CURSOR ================= */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");


document.addEventListener("mousemove", event => {

    cursor.style.left =
        `${event.clientX}px`;

    cursor.style.top =
        `${event.clientY}px`;


    follower.style.transform =
        `translate(
            ${event.clientX - 17}px,
            ${event.clientY - 17}px
        )`;

});


/* ================= BUTTON HOVER EFFECT ================= */

document
    .querySelectorAll(".btn, .service-card, .project-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                follower.style.transform +=
                    " scale(1.5)";

            }
        );

    });


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";

    }

});


/* ================= DYNAMIC YEAR ================= */

const year =
    new Date().getFullYear();

const footer =
    document.querySelector("footer");

if (footer) {

    footer.innerHTML =
        footer.innerHTML.replace(
            "2026",
            year
        );

}
