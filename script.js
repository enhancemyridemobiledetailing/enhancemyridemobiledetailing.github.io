/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   PREMIUM WEBSITE JAVASCRIPT
   SCRIPT.JS — FINAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const nav =
        document.querySelector("nav");

    const yearElement =
        document.getElementById("year");

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    const revealElements =
        document.querySelectorAll(".reveal");

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-image");

    const lightboxClose =
        document.querySelector(".lightbox-close");


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const closeMobileMenu = () => {

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

        if (nav) {

            nav.classList.remove("mobile-open");

        }

    };


    if (menuToggle && navMenu) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        menuToggle.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                menuToggle.classList.contains("active");

            if (isOpen) {

                closeMobileMenu();

            } else {

                menuToggle.classList.add("active");

                navMenu.classList.add("active");

                if (nav) {

                    nav.classList.add("mobile-open");

                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


        document.addEventListener("click", event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        });

    }


    /* =====================================================
       SERVICES DROPDOWN
       ===================================================== */

    const dropdown =
        document.querySelector(".nav-dropdown");

    const dropdownToggle =
        document.querySelector(".nav-dropdown-toggle");

    const dropdownMenu =
        document.querySelector(".services-dropdown");


    if (
        dropdown &&
        dropdownToggle &&
        dropdownMenu
    ) {

        dropdownToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        dropdownToggle.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    dropdownMenu.classList.contains("active");


                if (isOpen) {

                    dropdownMenu.classList.remove(
                        "active"
                    );

                    dropdownToggle.classList.remove(
                        "active"
                    );

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    dropdownMenu.classList.add(
                        "active"
                    );

                    dropdownToggle.classList.add(
                        "active"
                    );

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );


        document.addEventListener(
            "click",
            event => {

                if (
                    !dropdown.contains(event.target)
                ) {

                    dropdownMenu.classList.remove(
                        "active"
                    );

                    dropdownToggle.classList.remove(
                        "active"
                    );

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {

                    dropdownMenu.classList.remove(
                        "active"
                    );

                    dropdownToggle.classList.remove(
                        "active"
                    );

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       STAGGERED REVEALS
       ===================================================== */

    const revealGroups = [
        ".package-grid",
        ".gallery-grid",
        ".testimonial-grid",
        ".service-area-grid",
        ".stats-grid"
    ];


    revealGroups.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(group => {

                group
                    .querySelectorAll(".reveal")
                    .forEach((child, index) => {

                        child.style.transitionDelay =
                            `${index * 90}ms`;

                    });

            });

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        20;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (!currentPage) {

        currentPage =
            "index.html";

    }


    document
        .querySelectorAll(".nav-menu a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            if (
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }


            const cleanHref =
                href
                    .split("?")[0]
                    .split("#")[0];


            if (
                cleanHref === currentPage ||
                (
                    currentPage === "" &&
                    cleanHref === "index.html"
                )
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    faqQuestions.forEach(question => {

        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener(
            "click",
            () => {

                const answer =
                    question.nextElementSibling;


                if (!answer) return;


                const isOpen =
                    question.classList.contains(
                        "active"
                    );


                /* Close every FAQ */

                faqQuestions.forEach(
                    otherQuestion => {

                        if (
                            otherQuestion !== question
                        ) {

                            otherQuestion.classList.remove(
                                "active"
                            );

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            const otherAnswer =
                                otherQuestion
                                    .nextElementSibling;


                            if (otherAnswer) {

                                otherAnswer.style.maxHeight =
                                    null;

                                otherAnswer.style.opacity =
                                    "0";

                            }

                        }

                    }
                );


                /* Open selected FAQ */

                if (isOpen) {

                    question.classList.remove(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    answer.style.maxHeight =
                        null;

                    answer.style.opacity =
                        "0";

                } else {

                    question.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                    answer.style.opacity =
                        "1";

                }

            }
        );

    });


    /* =====================================================
       LIGHTBOX
       ===================================================== */

    if (
        lightbox &&
        lightboxImage
    ) {


        const getImageSource = element => {

            if (
                element.tagName === "IMG"
            ) {

                return (
                    element.getAttribute("src") ||
                    element.currentSrc ||
                    ""
                );

            }


            if (
                element.classList.contains(
                    "gallery-image"
                )
            ) {

                const background =
                    getComputedStyle(
                        element
                    ).backgroundImage;


                const match =
                    background.match(
                        /url\(["']?(.*?)["']?\)/
                    );


                if (match) {

                    return match[1];

                }

            }


            return "";

        };


        const openLightbox = imageSrc => {

            if (!imageSrc) return;


            lightboxImage.src =
                imageSrc;


            lightbox.classList.add(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "lightbox-open"
            );


            if (lightboxClose) {

                lightboxClose.focus();

            }

        };


        const closeLightbox = () => {

            lightbox.classList.remove(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "lightbox-open"
            );


            window.setTimeout(() => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    lightboxImage.removeAttribute(
                        "src"
                    );

                }

            }, 250);

        };


        const galleryImages =
            document.querySelectorAll(
                ".gallery-image, .premium-image img, .before-after-item img"
            );


        galleryImages.forEach(element => {

            element.style.cursor =
                "zoom-in";


            element.addEventListener(
                "click",
                () => {

                    const imageSrc =
                        getImageSource(
                            element
                        );


                    if (imageSrc) {

                        openLightbox(
                            imageSrc
                        );

                    }

                }
            );

        });


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


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


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains(
                        "active"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       PACKAGE URL SELECTION
       ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedPackage =
        urlParams.get("package");


    const packageSelect =
        document.querySelector(
            'select[name="package"], #package'
        );


    if (
        selectedPackage &&
        packageSelect
    ) {

        const packageMap = {

            gold: [
                "gold",
                "enhance gold",
                "gold package"
            ],

            "black-label": [
                "black-label",
                "black label",
                "enhance black label"
            ],

            showroom: [
                "showroom",
                "showroom edition",
                "enhance showroom edition"
            ]

        };


        const possibleValues =
            packageMap[
                selectedPackage.toLowerCase()
            ] || [];


        const option =
            Array.from(
                packageSelect.options
            ).find(option => {

                const optionValue =
                    (
                        option.value || ""
                    ).toLowerCase();


                const optionText =
                    (
                        option.textContent || ""
                    ).toLowerCase();


                return possibleValues.some(
                    value => {

                        const search =
                            value.toLowerCase();


                        return (
                            optionValue.includes(
                                search
                            ) ||
                            optionText.includes(
                                search
                            )
                        );

                    }
                );

            });


        if (option) {

            packageSelect.value =
                option.value;


            packageSelect.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles: true
                    }
                )
            );

        }

    }


    /* =====================================================
       BUTTON PRESS FEEDBACK
       ===================================================== */

    document
        .querySelectorAll(".button")
        .forEach(button => {

            button.addEventListener(
                "pointerdown",
                () => {

                    button.classList.add(
                        "button-pressed"
                    );

                }
            );


            button.addEventListener(
                "pointerup",
                () => {

                    button.classList.remove(
                        "button-pressed"
                    );

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.classList.remove(
                        "button-pressed"
                    );

                }
            );


            button.addEventListener(
                "pointercancel",
                () => {

                    button.classList.remove(
                        "button-pressed"
                    );

                }
            );

        });


    /* =====================================================
       IMAGE LOAD EFFECT
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            const markLoaded = () => {

                image.classList.add(
                    "image-loaded"
                );

            };


            if (image.complete) {

                markLoaded();

            } else {

                image.addEventListener(
                    "load",
                    markLoaded,
                    {
                        once: true
                    }
                );

            }

        });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );


                    console.warn(
                        "Enhance My Ride: Image could not be loaded:",
                        image.src
                    );

                },
                {
                    once: true
                }
            );

        });


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const hero =
        document.querySelector(".hero");


    const heroImage =
        document.querySelector(".hero-image");


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        hero &&
        heroImage &&
        !reducedMotion
    ) {

        let parallaxTicking =
            false;


        const updateHeroParallax =
            () => {

                const scrollY =
                    window.scrollY;


                const heroHeight =
                    hero.offsetHeight;


                if (
                    scrollY <= heroHeight
                ) {

                    const movement =
                        scrollY * 0.16;


                    heroImage.style.transform =
                        `translate3d(0, ${movement}px, 0)`;

                }


                parallaxTicking =
                    false;

            };


        window.addEventListener(
            "scroll",
            () => {

                if (
                    !parallaxTicking
                ) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    parallaxTicking =
                        true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       MAGNETIC GOLD BUTTONS
       ===================================================== */

    if (!reducedMotion) {

        document
            .querySelectorAll(".button-gold")
            .forEach(button => {

                button.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        button.style.transform =
                            `translate(${x * 0.08}px, ${y * 0.08}px)`;

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    () => {

                        button.style.transform =
                            "";

                    }
                );


                button.addEventListener(
                    "blur",
                    () => {

                        button.style.transform =
                            "";

                    }
                );

            });

    }


    /* =====================================================
       FORM SUBMISSION PROTECTION
       ===================================================== */

    document
        .querySelectorAll("form")
        .forEach(form => {

            form.addEventListener(
                "submit",
                () => {

                    const submitButton =
                        form.querySelector(
                            'button[type="submit"], input[type="submit"]'
                        );


                    if (!submitButton) {

                        return;

                    }


                    if (
                        submitButton.disabled
                    ) {

                        return;

                    }


                    submitButton.classList.add(
                        "is-submitting"
                    );


                    submitButton.disabled =
                        true;


                    if (
                        submitButton.tagName ===
                        "BUTTON"
                    ) {

                        submitButton.dataset.originalText =
                            submitButton.textContent;


                        submitButton.textContent =
                            "Processing...";

                    }

                }
            );

        });


    /* =====================================================
       EXTERNAL LINK SECURITY
       ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            const existingRel =
                link.getAttribute("rel") ||
                "";


            const relValues =
                new Set(
                    existingRel
                        .split(/\s+/)
                        .filter(Boolean)
                );


            relValues.add("noopener");

            relValues.add("noreferrer");


            link.setAttribute(
                "rel",
                Array.from(
                    relValues
                ).join(" ")
            );

        });


    /* =====================================================
       TOUCH DEVICE DETECTION
       ===================================================== */

    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (isTouchDevice) {

        document.body.classList.add(
            "touch-device"
        );

    }


    /* =====================================================
       LIGHTBOX BODY SCROLL LOCK
       ===================================================== */

    if (lightbox) {

        const observer =
            new MutationObserver(() => {

                if (
                    lightbox.classList.contains(
                        "active"
                    )
                ) {

                    document.body.classList.add(
                        "lightbox-open"
                    );

                } else {

                    document.body.classList.remove(
                        "lightbox-open"
                    );

                }

            });


        observer.observe(
            lightbox,
            {
                attributes: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    }


    /* =====================================================
       PAGE READY
       ===================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-ready"
        );

    });


    /* =====================================================
       CONSOLE BRAND MESSAGE
       ===================================================== */

    console.log(
        "%c ENHANCE MY RIDE ",
        "background:#050505;color:#e5c65a;font-size:18px;font-weight:bold;padding:8px 12px;"
    );


    console.log(
        "%c Premium Mobile Auto Spa ",
        "color:#c9a227;font-size:12px;"
    );

});
