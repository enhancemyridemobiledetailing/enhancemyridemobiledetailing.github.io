```javascript
/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   PREMIUM WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const revealElements = document.querySelectorAll(".reveal");

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");

    const faqQuestions = document.querySelectorAll(".faq-question");

    const yearElement = document.getElementById("year");


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            /*
             * Prevent background scrolling while
             * the mobile navigation is open.
             */
            if (window.innerWidth <= 800) {
                document.body.style.overflow =
                    isOpen ? "hidden" : "";
            }

        });


        /* Close menu after selecting a page */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                document.body.style.overflow = "";

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (window.innerWidth > 800) {
                return;
            }

            const clickedInsideNav =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedMenuButton &&
                navMenu.classList.contains("active")
            ) {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                document.body.style.overflow = "";

            }

        });

    }


    /* =====================================================
       RESET MOBILE MENU ON RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            if (menuToggle) {
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            document.body.style.overflow = "";

        }

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    if (revealElements.length) {

        if (prefersReducedMotion) {

            revealElements.forEach(element => {
                element.classList.add("visible");
            });

        } else {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(entry => {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -40px 0px"
                    }
                );


            revealElements.forEach(element => {

                revealObserver.observe(element);

            });

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        /*
         * Ignore quote query strings and anchors
         * when determining the current page.
         */

        const linkPage =
            href
                .split("?")[0]
                .split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();


        if (
            linkPage === currentPage &&
            linkPage !== ""
        ) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });


    /* =====================================================
       HOME PAGE DETECTION
       ===================================================== */

    if (
        currentPage === "" ||
        currentPage === "index.html"
    ) {

        const homeLink =
            document.querySelector(
                '.nav-menu a[href="index.html"]'
            );

        if (homeLink) {

            homeLink.classList.add("active");

            homeLink.setAttribute(
                "aria-current",
                "page"
            );

        }

    }


    /* =====================================================
       SMOOTH INTERNAL ANCHOR LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       AUTOMATIC COPYRIGHT YEAR
       ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    faqQuestions.forEach(question => {

        const answer =
            question.nextElementSibling;

        if (!answer) {
            return;
        }


        /*
         * Start closed unless the HTML specifically
         * marks the question as expanded.
         */

        const initiallyExpanded =
            question.getAttribute(
                "aria-expanded"
            ) === "true";


        answer.style.overflow = "hidden";

        if (!initiallyExpanded) {

            answer.style.maxHeight = "0";
            answer.style.paddingBottom = "0";

        }


        question.addEventListener("click", () => {

            const isOpen =
                question.getAttribute(
                    "aria-expanded"
                ) === "true";


            /*
             * Close all other FAQ items.
             */

            faqQuestions.forEach(otherQuestion => {

                if (otherQuestion === question) {
                    return;
                }

                const otherAnswer =
                    otherQuestion.nextElementSibling;

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (otherAnswer) {

                    otherAnswer.style.maxHeight = "0";

                    otherAnswer.style.paddingBottom = "0";

                }

                const otherIcon =
                    otherQuestion.querySelector(
                        "span:last-child"
                    );

                if (otherIcon) {
                    otherIcon.textContent = "+";
                }

            });


            /*
             * Toggle selected FAQ.
             */

            if (isOpen) {

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                answer.style.maxHeight = "0";

                answer.style.paddingBottom = "0";

            } else {

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                answer.style.paddingBottom = "22px";

            }


            const icon =
                question.querySelector(
                    "span:last-child"
                );

            if (icon) {

                icon.textContent =
                    isOpen ? "+" : "−";

            }

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
       ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            "[data-lightbox]"
        );


    function openLightbox(imageSource, altText = "") {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }

        lightboxImage.src =
            imageSource;

        lightboxImage.alt =
            altText || "Enhanced vehicle detail";

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

        if (lightboxImage) {
            lightboxImage.src = "";
        }

    }


    galleryImages.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const source =
                item.getAttribute("data-lightbox");

            const alt =
                item.getAttribute("data-alt") ||
                item.getAttribute("aria-label") ||
                "";

            if (source) {
                openLightbox(source, alt);
            }

        });

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                if (
                    lightbox &&
                    lightbox.classList.contains("active")
                ) {

                    closeLightbox();

                }


                if (
                    navMenu &&
                    navMenu.classList.contains("active")
                ) {

                    if (menuToggle) {

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }

                    navMenu.classList.remove("active");

                    document.body.style.overflow = "";

                }

            }

        }
    );


    /* =====================================================
       PACKAGE SELECTION
       quote.html?package=gold
       quote.html?package=black-label
       quote.html?package=showroom
       ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const selectedPackage =
        urlParams.get("package");


    if (selectedPackage) {

        const packageSelect =
            document.querySelector(
                'select[name="package"], #package'
            );


        if (packageSelect) {

            const packageMap = {

                "gold":
                    "Enhance Gold Package",

                "black-label":
                    "Enhance Black Label Package",

                "black":
                    "Enhance Black Label Package",

                "showroom":
                    "Enhance Showroom Edition"

            };


            const desiredValue =
                packageMap[
                    selectedPackage.toLowerCase()
                ];


            if (desiredValue) {

                const matchingOption =
                    Array.from(
                        packageSelect.options
                    ).find(option => {

                        return (
                            option.value
                                .toLowerCase()
                                .includes(
                                    selectedPackage
                                        .toLowerCase()
                                ) ||

                            option.text
                                .toLowerCase()
                                .includes(
                                    desiredValue
                                        .toLowerCase()
                                )
                        );

                    });


                if (matchingOption) {

                    packageSelect.value =
                        matchingOption.value;

                }

            }

        }

    }


    /* =====================================================
       FORM INPUT ENHANCEMENTS
       ===================================================== */

    const formInputs =
        document.querySelectorAll(
            "input, textarea, select"
        );


    formInputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                const group =
                    input.closest(".form-group");

                if (group) {
                    group.classList.add("focused");
                }

            }
        );


        input.addEventListener(
            "blur",
            () => {

                const group =
                    input.closest(".form-group");

                if (group) {
                    group.classList.remove("focused");
                }

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       PREVENT DOUBLE FORM SUBMISSIONS
       ===================================================== */

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", event => {

            const submitButton =
                form.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );


            if (!submitButton) {
                return;
            }


            /*
             * Only lock the button after the browser
             * has accepted the submission.
             */

            if (
                form.dataset.submitted === "true"
            ) {

                event.preventDefault();

                return;

            }


            form.dataset.submitted = "true";


            setTimeout(() => {

                submitButton.disabled = true;

                if (
                    submitButton.tagName ===
                    "BUTTON"
                ) {

                    submitButton.dataset.originalText =
                        submitButton.textContent;

                    submitButton.textContent =
                        "Submitting...";

                }

            }, 0);

        });

    });


    /* =====================================================
       BACK-TO-TOP BEHAVIOR
       Supports optional #backToTop button
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        const updateBackToTop =
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backToTop.classList.add(
                        "visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "visible"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );


    /* =====================================================
       DEBUG-FRIENDLY CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cEnhance My Ride",
        "color:#e5c65a;font-size:20px;font-weight:bold;"
    );

    console.log(
        "%cPremium Mobile Detailing",
        "color:#999;font-size:12px;"
    );

});
```
