/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   GLOBAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        function openMenu() {

            mainNav.classList.add("active");
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }


        function closeMenu() {

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


        function toggleMenu(event) {

            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            const isOpen =
                mainNav.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        }


        /* =================================================
           HAMBURGER BUTTON
           ================================================= */

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );


        /* =================================================
           NAVIGATION LINKS
           ================================================= */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


        /* =================================================
           CLICK OUTSIDE MENU
           ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mainNav.classList.contains("active")
                ) {
                    return;
                }

                if (
                    mainNav.contains(event.target) ||
                    menuToggle.contains(event.target)
                ) {
                    return;
                }

                closeMenu();

            }
        );


        /* =================================================
           ESCAPE KEY
           ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }
        );


        /* =================================================
           RESET WHEN SCREEN SIZE CHANGES
           ================================================= */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {

                    closeMenu();

                }

            }
        );

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
            {
                passive: true
            }
        );

    }


    /* =====================================================
       GALLERY LIGHTBOX
       ===================================================== */

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );

    const lightboxPrev =
        document.getElementById(
            "lightboxPrev"
        );

    const lightboxNext =
        document.getElementById(
            "lightboxNext"
        );

    const lightboxCounter =
        document.getElementById(
            "lightboxCounter"
        );

    const galleryItems =
        Array.from(
            document.querySelectorAll(
                "[data-lightbox]"
            )
        );


    if (
        lightbox &&
        lightboxImage &&
        galleryItems.length
    ) {

        let currentIndex = 0;


        /* =================================================
           GET IMAGE
           ================================================= */

        function getImage(item) {

            if (
                item.tagName &&
                item.tagName.toLowerCase() === "img"
            ) {

                return item;

            }

            return item.querySelector("img");

        }


        /* =================================================
           UPDATE LIGHTBOX
           ================================================= */

        function updateLightbox() {

            const item =
                galleryItems[currentIndex];

            if (!item) {
                return;
            }

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


        /* =================================================
           OPEN LIGHTBOX
           ================================================= */

        function openLightbox(index) {

            currentIndex =
                (
                    index +
                    galleryItems.length
                ) %
                galleryItems.length;

            updateLightbox();

            lightbox.classList.add(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        /* =================================================
           CLOSE LIGHTBOX
           ================================================= */

        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            lightboxImage.src = "";

            document.body.style.overflow =
                "";

        }


        /* =================================================
           PREVIOUS IMAGE
           ================================================= */

        function previousImage() {

            openLightbox(
                currentIndex - 1
            );

        }


        /* =================================================
           NEXT IMAGE
           ================================================= */

        function nextImage() {

            openLightbox(
                currentIndex + 1
            );

        }


        /* =================================================
           GALLERY ITEMS
           ================================================= */

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


        /* =================================================
           CLOSE BUTTON
           ================================================= */

        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


        /* =================================================
           PREVIOUS BUTTON
           ================================================= */

        if (lightboxPrev) {

            lightboxPrev.addEventListener(
                "click",
                previousImage
            );

        }


        /* =================================================
           NEXT BUTTON
           ================================================= */

        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                nextImage
            );

        }


        /* =================================================
           CLICK BACKDROP TO CLOSE
           ================================================= */

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


        /* =================================================
           LIGHTBOX KEYBOARD CONTROLS
           ================================================= */

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

                    return;

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