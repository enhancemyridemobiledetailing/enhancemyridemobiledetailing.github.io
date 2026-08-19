document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ENHANCE MY RIDE
       QR / BUSINESS CARD LANGUAGE ENGINE
    ===================================================== */


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");


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

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       LANGUAGE SYSTEM
    ===================================================== */

    const LANGUAGE_STORAGE_KEY =
        "enhanceMyRideLanguage";


    const supportedLanguages = [
        "en",
        "es"
    ];


    /*
        Read language from URL.

        Examples:

        language.html?lang=en
        language.html?lang=es
    */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const requestedLanguage =
        urlParams.get("lang");


    /*
        Check saved language.
    */

    const savedLanguage =
        localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        );


    /*
        Determine the current language.

        Priority:

        1. URL language
        2. Saved language
        3. Browser language
        4. English fallback
    */

    let currentLanguage = "en";


    if (
        requestedLanguage &&
        supportedLanguages.includes(
            requestedLanguage
        )
    ) {

        currentLanguage =
            requestedLanguage;

    } else if (
        savedLanguage &&
        supportedLanguages.includes(
            savedLanguage
        )
    ) {

        currentLanguage =
            savedLanguage;

    } else {

        const browserLanguage =
            (
                navigator.language ||
                navigator.userLanguage ||
                "en"
            ).toLowerCase();


        if (
            browserLanguage.startsWith("es")
        ) {

            currentLanguage = "es";

        }

    }


    /*
        Save the selected language.
    */

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        currentLanguage
    );


    /*
        Expose the language globally.

        Future landing-page scripts can use:

        window.enhanceMyRideLanguage
    */

    window.enhanceMyRideLanguage =
        currentLanguage;


    /* =====================================================
       LANGUAGE PAGE DETECTION
    ===================================================== */

    const isLanguagePage =
        document.body.classList.contains(
            "language-page"
        ) ||
        document.querySelector(
            ".language-page"
        );


    /* =====================================================
       LANGUAGE SELECTION
    ===================================================== */

    const languageOptions =
        document.querySelectorAll(
            ".language-option"
        );


    languageOptions.forEach((option) => {

        option.addEventListener(
            "click",
            (event) => {

                const href =
                    option.getAttribute(
                        "href"
                    );


                /*
                    Ignore unfinished
                    language buttons.
                */

                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                    return;

                }


                /*
                    Read language from
                    the destination URL.
                */

                try {

                    const destination =
                        new URL(
                            href,
                            window.location.href
                        );


                    const destinationLanguage =
                        destination.searchParams.get(
                            "lang"
                        );


                    if (
                        destinationLanguage &&
                        supportedLanguages.includes(
                            destinationLanguage
                        )
                    ) {

                        localStorage.setItem(
                            LANGUAGE_STORAGE_KEY,
                            destinationLanguage
                        );


                        window.enhanceMyRideLanguage =
                            destinationLanguage;

                    }

                } catch (error) {

                    console.warn(
                        "Enhance My Ride: Unable to read language selection.",
                        error
                    );

                }

            }
        );

    });


    /* =====================================================
       SMART LANDING-PAGE LANGUAGE ROUTING
    ===================================================== */

    /*
        If the customer reaches the main landing
        page without a language parameter, use the
        saved language.

        This will become active once index.html
        is connected to the language system.
    */

    const isMainLandingPage =
        (
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase()
        ) === "index.html";


    if (
        isMainLandingPage &&
        !requestedLanguage &&
        savedLanguage &&
        supportedLanguages.includes(
            savedLanguage
        )
    ) {

        /*
            We do NOT redirect immediately.

            Instead, keep the URL clean and expose
            the selected language to the landing
            page.

            This prevents unnecessary redirects
            and makes the QR experience faster.
        */

        window.enhanceMyRideLanguage =
            savedLanguage;

    }


    /* =====================================================
       FEATURED IMAGE REVEAL
    ===================================================== */

    const featuredImage =
        document.querySelector(
            ".featured-image"
        );


    if (featuredImage) {

        const revealImage = () => {

            featuredImage.classList.add(
                "visible"
            );

        };


        /*
            If the image is already cached,
            reveal it immediately.
        */

        if (featuredImage.complete) {

            setTimeout(
                revealImage,
                400
            );

        } else {

            featuredImage.addEventListener(
                "load",
                () => {

                    setTimeout(
                        revealImage,
                        300
                    );

                },
                {
                    once: true
                }
            );

        }

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


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (
                    entries,
                    observerInstance
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       BUTTON TOUCH FEEDBACK
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".action-button"
        );


    actionButtons.forEach(
        (button) => {

            button.addEventListener(
                "touchstart",
                () => {

                    button.classList.add(
                        "touch-active"
                    );

                },
                {
                    passive: true
                }
            );


            button.addEventListener(
                "touchend",
                () => {

                    setTimeout(
                        () => {

                            button.classList.remove(
                                "touch-active"
                            );

                        },
                        150
                    );

                },
                {
                    passive: true
                }
            );

        }
    );


    /* =====================================================
       EXTERNAL LINK HANDLING
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    link.classList.add(
                        "clicked"
                    );

                }
            );

        }
    );


    /* =====================================================
       PREVENT EMPTY LINKS
    ===================================================== */

    const unfinishedLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    unfinishedLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    console.log(
                        "Enhance My Ride: This link has not been connected yet."
                    );

                }
            );

        }
    );


    /* =====================================================
       IMAGE FALLBACK
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
       SMART PHONE LINKS
    ===================================================== */

    const callLink =
        document.getElementById(
            "callLink"
        );


    const textLink =
        document.getElementById(
            "textLink"
        );


    if (callLink) {

        callLink.addEventListener(
            "click",
            () => {

                console.log(
                    "Enhance My Ride: Call link activated."
                );

            }
        );

    }


    if (textLink) {

        textLink.addEventListener(
            "click",
            () => {

                console.log(
                    "Enhance My Ride: Text link activated."
                );

            }
        );

    }


    /* =====================================================
       LANGUAGE PAGE STATE
    ===================================================== */

    if (isLanguagePage) {

        /*
            Highlight the language that is currently
            selected without changing the customer's
            choice automatically.
        */

        languageOptions.forEach(
            (option) => {

                const href =
                    option.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                try {

                    const destination =
                        new URL(
                            href,
                            window.location.href
                        );


                    const optionLanguage =
                        destination.searchParams.get(
                            "lang"
                        );


                    if (
                        optionLanguage ===
                        currentLanguage
                    ) {

                        option.classList.add(
                            "selected-language"
                        );

                    }

                } catch (error) {

                    /*
                        Ignore malformed
                        placeholder links.
                    */

                }

            }
        );

    }


    /* =====================================================
       PAGE ENTRY ANIMATION
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


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


    console.log(
        `%cLanguage: ${currentLanguage}`,
        "font-size:11px;color:#c9a227;"
    );

});