/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   GLOBAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const siteHeader =
        document.querySelector(".site-header");


    if (menuToggle && mainNav) {


        /* =================================================
           OPEN MENU
           ================================================= */

        function openMenu() {

            menuToggle.classList.add("active");

            mainNav.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );


            /*
             * Force the mobile navigation to appear.
             *
             * Your stylesheet has multiple older
             * navigation systems in it, so these inline
             * !important styles make the active menu
             * visible without changing the rest of
             * your website design.
             */

            if (window.innerWidth <= 900) {

                const headerHeight =
                    siteHeader
                        ? siteHeader.getBoundingClientRect().height
                        : 82;


                mainNav.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );

                mainNav.style.setProperty(
                    "position",
                    "fixed",
                    "important"
                );

                mainNav.style.setProperty(
                    "top",
                    headerHeight + "px",
                    "important"
                );

                mainNav.style.setProperty(
                    "left",
                    "0",
                    "important"
                );

                mainNav.style.setProperty(
                    "right",
                    "0",
                    "important"
                );

                mainNav.style.setProperty(
                    "width",
                    "100%",
                    "important"
                );

                mainNav.style.setProperty(
                    "height",
                    "auto",
                    "important"
                );

                mainNav.style.setProperty(
                    "max-height",
                    "calc(100vh - " +
                    headerHeight +
                    "px)",
                    "important"
                );

                mainNav.style.setProperty(
                    "overflow-y",
                    "auto",
                    "important"
                );

                mainNav.style.setProperty(
                    "flex-direction",
                    "column",
                    "important"
                );

                mainNav.style.setProperty(
                    "align-items",
                    "stretch",
                    "important"
                );

                mainNav.style.setProperty(
                    "background",
                    "#050505",
                    "important"
                );

                mainNav.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                mainNav.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                mainNav.style.setProperty(
                    "transform",
                    "none",
                    "important"
                );

                mainNav.style.setProperty(
                    "z-index",
                    "10001",
                    "important"
                );


                document.body.classList.add(
                    "menu-open"
                );

            }

        }


        /* =================================================
           CLOSE MENU
           ================================================= */

        function closeMenu() {

            menuToggle.classList.remove(
                "active"
            );

            mainNav.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );


            /*
             * Remove only the inline styles that
             * were added when the mobile menu opened.
             */

            mainNav.style.removeProperty(
                "display"
            );

            mainNav.style.removeProperty(
                "position"
            );

            mainNav.style.removeProperty(
                "top"
            );

            mainNav.style.removeProperty(
                "left"
            );

            mainNav.style.removeProperty(
                "right"
            );

            mainNav.style.removeProperty(
                "width"
            );

            mainNav.style.removeProperty(
                "height"
            );

            mainNav.style.removeProperty(
                "max-height"
            );

            mainNav.style.removeProperty(
                "overflow-y"
            );

            mainNav.style.removeProperty(
                "flex-direction"
            );

            mainNav.style.removeProperty(
                "align-items"
            );

            mainNav.style.removeProperty(
                "background"
            );

            mainNav.style.removeProperty(
                "visibility"
            );

            mainNav.style.removeProperty(
                "opacity"
            );

            mainNav.style.removeProperty(
                "transform"
            );

            mainNav.style.removeProperty(
                "z-index"
            );


            document.body.classList.remove(
                "menu-open"
            );

        }


        /* =================================================
           TOGGLE MENU
           ================================================= */

        function toggleMenu(event) {

            if (event) {

                event.preventDefault();

                event.stopPropagation();

            }


            const isOpen =
                mainNav.classList.contains(
                    "active"
                );


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
                    !mainNav.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (
                    mainNav.contains(
                        event.target
                    ) ||
                    menuToggle.contains(
                        event.target
                    )
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

                if (
                    event.key === "Escape" &&
                    mainNav.classList.contains(
                        "active"
                    )
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           SCREEN SIZE CHANGE
           ================================================= */

        window.addEventListener(
            "resize",
            function () {

                /*
                 * If the screen becomes desktop-sized,
                 * completely reset the mobile menu.
                 */

                if (window.innerWidth > 900) {

                    closeMenu();

                }


                /*
                 * If the menu is open while the
                 * mobile device is resized/rotated,
                 * recalculate its position.
                 */

                if (
                    window.innerWidth <= 900 &&
                    mainNav.classList.contains(
                        "active"
                    )
                ) {

                    const headerHeight =
                        siteHeader
                            ? siteHeader.getBoundingClientRect().height
                            : 82;


                    mainNav.style.setProperty(
                        "top",
                        headerHeight + "px",
                        "important"
                    );

                    mainNav.style.setProperty(
                        "max-height",
                        "calc(100vh - " +
                        headerHeight +
                        "px)",
                        "important"
                    );

                }

            }
        );

    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    if (header) {

        function updateHeader() {

            if (window.scrollY > 20) {

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
                item.tagName.toLowerCase() ===
                    "img"
            ) {

                return item;

            }


            return item.querySelector(
                "img"
            );

        }


        /* =================================================
           UPDATE LIGHTBOX
           ================================================= */

        function updateLightbox() {

            const item =
                galleryItems[
                    currentIndex
                ];


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

                        openLightbox(
                            index
                        );

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
                    event.target ===
                    lightbox
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


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLightbox();

                    return;

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousImage();

                    return;

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextImage();

                }

            }
        );

    }

});