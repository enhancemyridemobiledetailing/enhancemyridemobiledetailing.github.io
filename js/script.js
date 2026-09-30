/* =========================================================
   ENHANCE MY RIDE
   AUTO SPA & MOBILE DETAILING
   SITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        const closeMenu = () => {

            menuToggle.classList.remove("active");
            mainNav.classList.remove("active");
            mainNav.classList.remove("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        };


        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                mainNav.classList.contains("active");

            if (isOpen) {

                closeMenu();

            } else {

                menuToggle.classList.add("active");
                mainNav.classList.add("active");
                mainNav.classList.add("mobile-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            }

        });


        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


        document.addEventListener(
            "click",
            event => {

                if (
                    !mainNav.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMenu();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       NAVIGATION SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 25) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

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


        const getImage =
            item => {

                if (
                    item.tagName &&
                    item.tagName.toLowerCase() === "img"
                ) {
                    return item;
                }

                return item.querySelector("img");

            };


        const updateLightbox = () => {

            const item =
                galleryItems[currentIndex];

            const image =
                getImage(item);

            if (!image) return;

            lightboxImage.src =
                image.currentSrc ||
                image.src;

            lightboxImage.alt =
                image.alt || "";

            if (lightboxCounter) {

                lightboxCounter.textContent =
                    `${currentIndex + 1} / ${galleryItems.length}`;

            }

        };


        const openLightbox = index => {

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

        };


        const closeLightbox = () => {

            lightbox.classList.remove("active");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            lightboxImage.src = "";

            document.body.style.overflow =
                "";

        };


        const showPrevious = () => {

            openLightbox(
                currentIndex - 1
            );

        };


        const showNext = () => {

            openLightbox(
                currentIndex + 1
            );

        };


        galleryItems.forEach(
            (item, index) => {

                item.addEventListener(
                    "click",
                    () => openLightbox(index)
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
                showPrevious
            );

        }


        if (lightboxNext) {

            lightboxNext.addEventListener(
                "click",
                showNext
            );

        }


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                if (
                    event.key === "Escape"
                ) {
                    closeLightbox();
                }

                if (
                    event.key === "ArrowLeft"
                ) {
                    showPrevious();
                }

                if (
                    event.key === "ArrowRight"
                ) {
                    showNext();
                }

            }
        );

    }


    /* =====================================================
       REDUCE MOTION SUPPORT
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});