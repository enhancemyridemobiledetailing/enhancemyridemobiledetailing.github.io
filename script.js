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
    const nav = document.querySelector("nav");
    const navMenu = document.getElementById("navMenu");

    const yearElement = document.getElementById("year");

    const revealElements = document.querySelectorAll(".reveal");

    const faqQuestions = document.querySelectorAll(".faq-question");

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxClose = document.querySelector(".lightbox-close");

    const galleryImages = document.querySelectorAll(
        ".gallery-image, .premium-image img, .before-after-item img"
    );


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.contains("active");

            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

            if (nav) {
                nav.classList.toggle("mobile-open");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                !isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        /* Close menu when clicking a navigation link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                if (nav) {
                    nav.classList.remove("mobile-open");
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                if (nav) {
                    nav.classList.remove("mobile-open");
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });


        /* Close menu with Escape */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                if (nav) {
                    nav.classList.remove("mobile-open");
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar =
        document.querySelector(".navbar");

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

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

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
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       STAGGERED CARD REVEALS
       ===================================================== */

    const revealGroups = [
        ".package-grid",
        ".gallery-grid",
        ".testimonial-grid",
        ".service-area-grid",
        ".stats-grid"
    ];

    revealGroups.forEach(selector => {

        const groups =
            document.querySelectorAll(selector);

        groups.forEach(group => {

            const children =
                group.querySelectorAll(".reveal");

            children.forEach((child, index) => {

                child.style.transitionDelay =
                    `${index * 90}ms`;

            });

        });

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
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

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(
        ".nav-menu a"
    ).forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const cleanHref =
            href.split("?")[0]
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

        question.addEventListener("click", () => {

            const answer =
                question.nextElementSibling;

            if (!answer) return;

            const isOpen =
                question.classList.contains("active");


            /* Close all other FAQs */

            faqQuestions.forEach(otherQuestion => {

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
                        otherQuestion.nextElementSibling;

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                        otherAnswer.style.opacity =
                            "0";

                    }

                }

            });


            /* Toggle selected FAQ */

            if (isOpen) {

                question.classList.remove(
                    "active"
                );

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                answer.style.maxHeight = null;

                answer.style.opacity = "0";

            } else {

                question.classList.add(
                    "active"
                );

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                answer.style.opacity = "1";

            }

        });

    });


    /* =====================================================
       LIGHTBOX
       ===================================================== */

    if (
        lightbox &&
        lightboxImage
    ) {

        const openLightbox = imageSrc => {

            lightboxImage.src = imageSrc;

            lightbox.classList.add("active");

            document.body.classList.add(
                "lightbox-open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        };


        const closeLightbox = () => {

            lightbox.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "lightbox-open"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            setTimeout(() => {

                lightboxImage.src = "";

            }, 250);

        };


        galleryImages.forEach(element => {

            element.style.cursor = "zoom-in";

            element.addEventListener(
                "click",
                () => {

                    let imageSrc = "";


                    /* Normal image */

                    if (
                        element.tagName === "IMG"
                    ) {

                        imageSrc =
                            element.getAttribute(
                                "src"
                            );

                    }


                    /* Background image */

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

                            imageSrc =
                                match[1];

                        }

                    }


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
                "Gold",
                "Enhance Gold",
                "Gold Package"
            ],

            "black-label": [
                "black-label",
                "Black Label",
                "Enhance Black Label"
            ],

            showroom: [
                "showroom",
                "Showroom",
                "Enhance Showroom Edition",
                "Showroom Edition"
            ]

        };


        const possibleValues =
            packageMap[selectedPackage] || [];


        const option =
            Array.from(
                packageSelect.options
            ).find(option =>
                possibleValues.some(value =>
                    option.value
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        ) ||
                    option.textContent
                        .toLowerCase()
                        .includes(
                            value.toLowerCase()
                        )
                )
            );


        if (option) {

            packageSelect.value =
                option.value;

            packageSelect.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );

        }

    }


    /* =====================================================
       BUTTON PRESS FEEDBACK
       ===================================================== */

    document.querySelectorAll(
        ".button"
    ).forEach(button => {

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

    });


    /* =====================================================
       IMAGE LOAD EFFECT
       ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                },
                {
                    once: true
                }
            );

        }

    });


    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image");


    if (
        hero &&
        heroImage &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let ticking = false;


        const updateHeroParallax = () => {

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
                    `translateY(${movement}px)`;

            }

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    ticking = true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       MAGNETIC GOLD BUTTON EFFECT
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".button-gold"
        );


    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        magneticButtons.forEach(button => {

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

        });

    }


    /* =====================================================
       PREVENT FORM DOUBLE SUBMISSION
       ===================================================== */

    document.querySelectorAll(
        "form"
    ).forEach(form => {

        form.addEventListener(
            "submit",
            () => {

                const submitButton =
                    form.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );

                if (!submitButton) return;

                submitButton.classList.add(
                    "is-submitting"
                );

                submitButton.dataset.originalText =
                    submitButton.textContent;

                if (
                    submitButton.tagName ===
                    "BUTTON"
                ) {

                    submitButton.textContent =
                        "Processing...";

                }

                submitButton.disabled =
                    true;

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    !link.rel.includes(
                        "noopener"
                    )
                ) {

                    link.rel =
                        `${link.rel} noopener noreferrer`
                            .trim();

                }

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

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

            }
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
