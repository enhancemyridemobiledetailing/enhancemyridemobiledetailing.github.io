document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    const hideLoader = () => {

        if (pageLoader) {
            pageLoader.classList.add("loaded");
        }

    };

    if (document.readyState === "complete") {

        setTimeout(hideLoader, 500);

    } else {

        window.addEventListener("load", () => {

            setTimeout(hideLoader, 500);

        }, { once: true });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       FEATURED IMAGE
    ===================================================== */

    const featuredImage =
        document.querySelector(".featured-image");


    if (featuredImage) {

        const revealImage = () => {

            featuredImage.classList.add("visible");

        };


        if (featuredImage.complete) {

            setTimeout(revealImage, 150);

        } else {

            featuredImage.addEventListener(
                "load",
                revealImage,
                { once: true }
            );

        }


        featuredImage.addEventListener(
            "error",
            () => {

                const wrapper =
                    featuredImage.closest(
                        ".featured-image-wrapper"
                    );

                if (wrapper) {

                    wrapper.classList.add(
                        "image-missing"
                    );

                }

                /*
                    Never leave the image permanently
                    invisible if the file fails.
                */

                featuredImage.classList.add("visible");

            },
            { once: true }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".transformation-section, " +
            ".actions-section, " +
            ".trust-section, " +
            ".scan-footer"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    /*
        Use IntersectionObserver when available.
    */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.05,
                    rootMargin: "0px 0px 80px 0px"
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
       ACTION BUTTONS
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".action-button"
        );


    actionButtons.forEach((button) => {


        button.addEventListener(
            "touchstart",
            () => {

                button.classList.add(
                    "touch-active"
                );

            },
            { passive: true }
        );


        button.addEventListener(
            "touchend",
            () => {

                setTimeout(() => {

                    button.classList.remove(
                        "touch-active"
                    );

                }, 150);

            },
            { passive: true }
        );


        button.addEventListener(
            "touchcancel",
            () => {

                button.classList.remove(
                    "touch-active"
                );

            },
            { passive: true }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add("clicked");

            }
        );

    });


    /* =====================================================
       PREVENT EMPTY LINKS
    ===================================================== */

    const unfinishedLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    unfinishedLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       SMART PHONE LINKS
    ===================================================== */

    const callLink =
        document.getElementById("callLink");

    const textLink =
        document.getElementById("textLink");


    if (callLink) {

        callLink.addEventListener(
            "click",
            () => {

                console.log(
                    "Calling Enhance My Ride."
                );

            }
        );

    }


    if (textLink) {

        textLink.addEventListener(
            "click",
            () => {

                console.log(
                    "Texting Enhance My Ride."
                );

            }
        );

    }


    /* =====================================================
       PAGE ENTRY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    /* =====================================================
       CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%cEnhance My Ride",
        "font-size:18px;font-weight:bold;color:#c9a227;"
    );


    console.log(
        "%cPremium Mobile Detailing",
        "font-size:12px;color:#ffffff;"
    );

});