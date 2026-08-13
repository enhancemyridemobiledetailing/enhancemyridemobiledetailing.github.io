/* =========================================================
   ENHANCE MY RIDE
   GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mainNav.classList.toggle("is-open");

            menuToggle.classList.toggle(
                "is-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu when a navigation link is clicked */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("is-open");

                menuToggle.classList.remove("is-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideNav =
                    mainNav.contains(event.target);

                const clickedMenuButton =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideNav &&
                    !clickedMenuButton &&
                    mainNav.classList.contains("is-open")
                ) {

                    mainNav.classList.remove(
                        "is-open"
                    );

                    menuToggle.classList.remove(
                        "is-open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });



    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const smoothLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    smoothLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


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


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        function updateHeader() {

            if (window.scrollY > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }



    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mainNav &&
                mainNav.classList.contains("is-open")
            ) {

                mainNav.classList.remove(
                    "is-open"
                );


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "is-open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );
});
