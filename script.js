/* =========================================================
   ENHANCE MY RIDE
   MAIN JAVASCRIPT
   MENU / DROPDOWN / FAQ / LIGHTBOX / REVEAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector("nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
       ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-menu a:not(.nav-dropdown-toggle)"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (menuToggle && mainNav) {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

            }

        });

    });


    /* =====================================================
       SERVICES DROPDOWN
       ===================================================== */

    const dropdownToggle =
        document.querySelector(".nav-dropdown-toggle");

    const servicesDropdown =
        document.querySelector(".services-dropdown");

    if (dropdownToggle && servicesDropdown) {

        dropdownToggle.addEventListener("click", function (event) {

            event.preventDefault();

            dropdownToggle.classList.toggle("active");
            servicesDropdown.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            dropdownToggle &&
            servicesDropdown &&
            !event.target.closest(".nav-dropdown")
        ) {

            dropdownToggle.classList.remove("active");
            servicesDropdown.classList.remove("active");

        }

    });


    /* =====================================================
       FAQ
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

                    item.classList.remove("active");

                });

            if (!isOpen) {

                answer.style.display = "block";
                question.classList.add("active");

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

                            observer.unobserve(entry.target);

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
       LIGHTBOX
       ===================================================== */

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-image");

    const lightboxClose =
        document.querySelector(".lightbox-close");

    const galleryImages =
        document.querySelectorAll(
            "[data-lightbox]"
        );

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            if (!lightbox || !lightboxImage) return;

            const imageSource =
                image.getAttribute("data-lightbox");

            lightboxImage.src = imageSource;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeLightbox();

            }

        }
    );


});
