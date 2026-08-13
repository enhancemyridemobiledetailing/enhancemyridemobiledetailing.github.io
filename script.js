/* =========================================================
   ENHANCE MY RIDE
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = menuToggle.classList.toggle("active");

            mainNav.classList.toggle("active", isOpen);

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

        });

    }


    /* =====================================================
       SERVICES DROPDOWN
    ===================================================== */

    const servicesToggle =
        document.getElementById("servicesToggle");

    const servicesDropdown =
        document.getElementById("servicesDropdown");

    if (servicesToggle && servicesDropdown) {

        servicesToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                servicesDropdown.classList.toggle("active");

            servicesToggle.classList.toggle("active", isOpen);

            servicesToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            mainNav &&
            menuToggle &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mainNav.classList.remove("active");

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


        if (
            servicesDropdown &&
            servicesToggle &&
            !servicesDropdown.contains(event.target) &&
            !servicesToggle.contains(event.target)
        ) {

            servicesDropdown.classList.remove("active");

            servicesToggle.classList.remove("active");

            servicesToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING A LINK
    ===================================================== */

    if (mainNav) {

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

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

            });

        });

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer =
                question.nextElementSibling;

            if (!answer) return;

            const isOpen =
                answer.style.display === "block";

            document
                .querySelectorAll(".faq-answer")
                .forEach(function (item) {

                    item.style.display = "none";

                });

            document
                .querySelectorAll(".faq-question")
                .forEach(function (item) {

                    item.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        item.querySelector("span:last-child");

                    if (icon) {
                        icon.textContent = "+";
                    }

                });

            if (!isOpen) {

                answer.style.display = "block";

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                const icon =
                    question.querySelector("span:last-child");

                if (icon) {
                    icon.textContent = "−";
                }

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

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

            if (servicesDropdown) {
                servicesDropdown.classList.remove("active");
            }

            if (servicesToggle) {

                servicesToggle.classList.remove("active");

                servicesToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });

});
