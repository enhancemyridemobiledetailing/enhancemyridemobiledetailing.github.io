document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* =====================================================
       FEATURED IMAGE REVEAL
    ===================================================== */

    const featuredImage =
        document.querySelector(".featured-image");


    if (featuredImage) {

        const revealImage = () => {

            featuredImage.classList.add("visible");

        };


        /*
            If the image is already cached, reveal it
            immediately.
        */

        if (featuredImage.complete) {

            setTimeout(revealImage, 400);

        } else {

            featuredImage.addEventListener(
                "load",
                () => {
                    setTimeout(revealImage, 300);
                },
                { once: true }
            );

        }

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".transformation-section, .actions-section, .trust-section, .scan-footer"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       BUTTON TOUCH FEEDBACK
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(".action-button");


    actionButtons.forEach((button) => {

        button.addEventListener("touchstart", () => {

            button.classList.add("touch-active");

        }, { passive: true });


        button.addEventListener("touchend", () => {

            setTimeout(() => {

                button.classList.remove(
                    "touch-active"
                );

            }, 150);

        }, { passive: true });

    });


    /* =====================================================
       EXTERNAL LINK HANDLING
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.classList.add("clicked");

        });

    });


    /* =====================================================
       PREVENT EMPTY LINKS
       
       This makes sure unfinished # links don't
       accidentally jump the customer to the top
       of the page.
    ===================================================== */

    const unfinishedLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    unfinishedLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            console.log(
                "This link will be connected in Part 4."
            );

        });

    });


    /* =====================================================
       IMAGE FALLBACK
       
       If the featured image hasn't been uploaded yet,
       keep the page looking clean instead of showing
       a broken-image icon.
    ===================================================== */

    if (featuredImage) {

        featuredImage.addEventListener(
            "error",
            () => {

                const imageWrapper =
                    featuredImage.closest(
                        ".featured-image-wrapper"
                    );


                if (imageWrapper) {

                    imageWrapper.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    }


    /* =====================================================
       SMART PHONE LINK
       
       These are placeholders for now.
       We will replace them with the actual business
       number during Part 4.
    ===================================================== */

    const callLink =
        document.getElementById("callLink");


    const textLink =
        document.getElementById("textLink");


    if (callLink) {

        callLink.addEventListener("click", () => {

            console.log(
                "Call link ready for your business number."
            );

        });

    }


    if (textLink) {

        textLink.addEventListener("click", () => {

            console.log(
                "Text link ready for your business number."
            );

        });

    }


    /* =====================================================
       PAGE ENTRY ANIMATION
    ===================================================== */

    document.body.classList.add("page-ready");


    /* =====================================================
       CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%cEnhance My Ride",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cPremium Mobile Detailing",
        "font-size:12px;"
    );

});