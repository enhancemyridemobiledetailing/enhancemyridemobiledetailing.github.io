/* =========================================================
   ENHANCE MY RIDE
   QR / BUSINESS CARD LANDING PAGE
   GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           PAGE LOADER
        ===================================================== */

        const pageLoader =
            document.getElementById("pageLoader");


        if (pageLoader) {

            pageLoader.classList.add("loaded");


            setTimeout(
                function () {

                    pageLoader.style.display = "none";

                },
                700
            );

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
           PAGE READY
        ===================================================== */

        document.body.classList.add(
            "page-ready"
        );


        /* =====================================================
           CONSOLE MESSAGE
        ===================================================== */

        console.log(
            "Enhance My Ride — Landing Page Ready"
        );

    }
);