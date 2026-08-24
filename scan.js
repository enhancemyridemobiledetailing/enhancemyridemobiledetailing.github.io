/* =========================================================
   ENHANCE MY RIDE
   QR / BUSINESS CARD LANDING PAGE
   GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    if (pageLoader) {

        // Allow the page to render before fading out
        requestAnimationFrame(() => {

            pageLoader.classList.add("loaded");

        });

        // Remove the loader completely after the transition
        setTimeout(() => {

            pageLoader.style.display = "none";

        }, 750);

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");


    /* =====================================================
       ACTION BUTTON FEEDBACK
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(".action-button");

    actionButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.add("button-active");

            setTimeout(() => {

                button.classList.remove("button-active");

            }, 300);

        });

    });


    /* =====================================================
       EXTERNAL LINK HANDLING
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       CONSOLE BRAND MESSAGE
    ===================================================== */

    console.log(
        "%cEnhance My Ride",
        "color:#e2c45b;font-size:18px;font-weight:700;"
    );

    console.log(
        "%cPremium Mobile Detailing — Landing Page Ready",
        "color:#9a9a9a;font-size:12px;"
    );

});