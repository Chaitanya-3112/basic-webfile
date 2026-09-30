/* =========================================================
   MODERN PORTFOLIO — INTERACTIVE JAVASCRIPT
   ========================================================= */


/* =========================
   DOM HELPERS
========================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================
   THEME SYSTEM
========================= */

const themeButton = $("#themeToggle");

const applyTheme = (theme) => {
    document.body.classList.toggle("light", theme === "light");

    if (themeButton) {
        themeButton.textContent =
            theme === "light" ? "🌙" : "☀️";
    }
};

const storedTheme = localStorage.getItem("portfolio-theme");

applyTheme(storedTheme || "dark");

themeButton?.addEventListener("click", () => {

    const lightMode =
        document.body.classList.toggle("light");

    const selectedTheme =
        lightMode ? "light" : "dark";

    localStorage.setItem(
        "portfolio-theme",
        selectedTheme
    );

    themeButton.textContent =
        lightMode ? "🌙" : "☀️";
});


/* =========================
   NAVIGATION
========================= */

const menuButton = $("#menuToggle");
const navigation = $(".nav-menu");

const closeMenu = () => {

    navigation?.classList.remove("active");

    if (menuButton) {
        menuButton.textContent = "☰";
    }
};

menuButton?.addEventListener("click", () => {

    const opened =
        navigation.classList.toggle("active");

    menuButton.textContent =
        opened ? "✕" : "☰";
});


$$(".nav-menu a").forEach(link => {

    link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = $("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

}, { passive: true });


/* =========================
   REVEAL ANIMATIONS
========================= */

const revealItems = $$(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (items, observer) => {

                items.forEach(item => {

                    if (!item.isIntersecting) return;

                    item.target.classList.add("visible");

                    observer.unobserve(item.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

} else {

    revealItems.forEach(item => {
        item.classList.add("visible");
    });

}


/* =========================
   STAT COUNTERS
========================= */

const statCards = $$(".counter");

const animateNumber = (element) => {

    const destination =
        parseInt(element.dataset.target, 10);

    if (Number.isNaN(destination)) return;

    const duration = 1600;
    const startTime = performance.now();

    const update = (currentTime) => {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.floor(destination * eased);

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = destination;
        }
    };

    requestAnimationFrame(update);
};


if (statCards.length) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                if (!entries[0].isIntersecting) return;

                statCards.forEach(animateNumber);

                observer.disconnect();

            },
            {
                threshold: 0.35
            }
        );

    const statsContainer =
        $(".stats-section");

    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
}


/* =========================
   FAQ ACCORDION
========================= */

$$(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.closest(".faq-item");

        if (!currentItem) return;

        const currentlyOpen =
            currentItem.classList.contains("active");

        $$(".faq-item").forEach(item => {

            item.classList.remove("active");

            const content =
                item.querySelector(".faq-answer");

            if (content) {
                content.style.maxHeight = null;
            }

        });

        if (!currentlyOpen) {

            currentItem.classList.add("active");

            const answer =
                currentItem.querySelector(".faq-answer");

            if (answer) {
                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;
            }

        }

    });

});


/* =========================
   CONTACT FORM
========================= */

const contactForm = $("#contactForm");
const messageBox = $("#formMessage");

contactForm?.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        $("#name")?.value.trim();

    const email =
        $("#email")?.value.trim();

    const subject =
        $("#subject")?.value.trim();

    const message =
        $("#message")?.value.trim();

    if (!name || !email || !subject || !message) {

        showFormMessage(
            "Please complete all fields.",
            "error"
        );

        return;
    }

    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {

        showFormMessage(
            "Enter a valid email address.",
            "error"
        );

        return;
    }

    showFormMessage(
        `Thanks ${name}! Your message has been received.`,
        "success"
    );

    contactForm.reset();

});


function showFormMessage(text, type) {

    if (!messageBox) return;

    messageBox.textContent = text;

    messageBox.className =
        `form-message ${type}`;

}


/* =========================
   BACK TO TOP
========================= */

const topButton = $("#backTop");

window.addEventListener("scroll", () => {

    if (!topButton) return;

    topButton.classList.toggle(
        "show",
        window.scrollY > 500
    );

}, { passive: true });


topButton?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   MODERN CURSOR
========================= */

const cursorDot = $(".cursor");
const cursorRing = $(".cursor-follower");

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;

if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;
        }

    });

    const followCursor = () => {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorRing) {

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;
        }

        requestAnimationFrame(followCursor);
    };

    followCursor();


    /* Cursor interaction */

    $$("a, button, .service-card, .project-card")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursorRing?.classList.add("cursor-active");
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursorRing?.classList.remove("cursor-active");
                }
            );

        });

}


/* =========================
   CARD TILT EFFECT
========================= */

$$(".project-card, .service-card").forEach(card => {

    card.addEventListener("mousemove", (event) => {

        if (!window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        const rotateX =
            ((y / rect.height) - 0.5) * -8;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================
   ACTIVE NAV LINK
========================= */

const sections = $$("section[id]");
const navLinks = $$(".nav-menu a");

if (sections.length && navLinks.length) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        const target =
                            link.getAttribute("href");

                        if (
                            target ===
                            `#${entry.target.id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                threshold: 0.45
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* =========================
   DYNAMIC FOOTER YEAR
========================= */

const currentYear =
    new Date().getFullYear();

const yearElements =
    $$("[data-year]");

yearElements.forEach(element => {

    element.textContent = currentYear;

});


/* =========================
   PAGE LOADED
========================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
