/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   GLOBAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE DROPDOWN / HAMBURGER MENU
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("active");

            const isOpen =
                mainNav.classList.contains("active");

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


        /* Close menu after clicking a link */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

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

        document.addEventListener("click", function (event) {

            if (
                mainNav.classList.contains("active") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

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


        /* Close with Escape */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");

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
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    if (header) {

        function updateHeader() {

            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
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
       GALLERY LIGHTBOX
       ===================================================== */

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    const galleryItems =
        Array.from(
            document.querySelectorAll("[data-lightbox]")
        );


    if (
        lightbox &&
        lightboxImage &&
        galleryItems.length
    ) {

        let currentIndex = 0;


        function getImage(item) {

            if (
                item.tagName &&
                item.tagName.toLowerCase() === "img"
            ) {
                return item;
            }

            return item.querySelector("img");

        }


        function updateLightbox() {

            const item =
                galleryItems[currentIndex];

            const image =
                getImage(item);

            if (!image) {
                return;
            }

            lightboxImage.src =
                image.currentSrc ||
                image.src;

            lightboxImage.alt =
                image.alt || "";

            if (lightboxCounter) {

                lightboxCounter.textContent =
                    (currentIndex + 1) +
                    " / " +
                    galleryItems.length;

            }

        }


        function openLightbox(index) {

            currentIndex =
                (index + galleryItems.length) %
                galleryItems.length;

            updateLightbox();

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        function closeLightbox() {

            lightbox.classList.remove("active");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            lightboxImage.src = "";

            document.body.style.overflow =
                "";

        }


        function previousImage() {

            openLightbox(
                currentIndex - 1
            );

        }


        function nextImage() {

            openLightbox(
                currentIndex + 1
            );

        }


        galleryItems.forEach(
            function (item, index) {

                item.addEventListener(
                    "click",
                    function () {
                        openLightbox(index);
                    }
                );

            }
        );


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                previousImage
            );

        }


        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                nextImage
            );

        }


        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                if (event.key === "Escape") {
                    closeLightbox();
                }

                if (event.key === "ArrowLeft") {
                    previousImage();
                }

                if (event.key === "ArrowRight") {
                    nextImage();
                }

            }
        );

    }

});