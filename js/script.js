// ============================================================
// ENHANCE MY RIDE AUTO SPA & MOBILE DETAILING
// SHARED WEBSITE JAVASCRIPT
// ============================================================

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    initializeMobileNavigation();
    initializeSmoothScroll();
    initializeCurrentYear();
    initializeBackToTop();
    initializeGallery();
    initializeBookingPackage();
    initializeFormEnhancements();
    initializeRevealAnimations();
});


// ============================================================
// 1. MOBILE NAVIGATION
// Works with .menu-toggle and .main-nav
// ============================================================

function initializeMobileNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (!menuButton || !navigation) return;

    function openMenu() {
        navigation.classList.add("active");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        navigation.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    menuButton.addEventListener("click", toggleMenu);

    // Close after a navigation link is selected.
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    // Close when the Escape key is pressed.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close if the user taps outside the open navigation.
    document.addEventListener("click", function (event) {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (
            isOpen &&
            !navigation.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Close the mobile menu when switching back to desktop layout.
    window.addEventListener("resize", function () {
        if (window.innerWidth > 820) {
            closeMenu();
        }
    });
}


// ============================================================
// 2. SMOOTH SCROLL FOR SAME-PAGE ANCHOR LINKS
// ============================================================

function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL useful for direct links and browser history.
            if (window.location.hash !== targetId) {
                history.replaceState(null, "", targetId);
            }
        });
    });
}


// ============================================================
// 3. AUTOMATIC COPYRIGHT YEAR
// Supports the existing #current-year element.
// ============================================================

function initializeCurrentYear() {
    const yearElements = document.querySelectorAll(
        "#current-year, [data-current-year]"
    );

    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });
}


// ============================================================
// 4. BACK-TO-TOP BUTTON
// Optional: add a button with id="back-to-top" to any page.
// ============================================================

function initializeBackToTop() {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    button.hidden = true;

    function updateVisibility() {
        button.hidden = window.scrollY < 450;
    }

    window.addEventListener("scroll", updateVisibility, {
        passive: true
    });

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    });

    updateVisibility();
}


// ============================================================
// 5. GALLERY FILTERS
// Optional markup:
// Buttons: [data-gallery-filter="all"], "interior", "exterior"
// Items:   [data-gallery-category="interior"]
// ============================================================

function initializeGallery() {
    const filterButtons = document.querySelectorAll(
        "[data-gallery-filter]"
    );

    const galleryItems = document.querySelectorAll(
        "[data-gallery-category]"
    );

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter =
                button.getAttribute("data-gallery-filter");

            filterButtons.forEach(function (otherButton) {
                const isSelected = otherButton === button;

                otherButton.classList.toggle("active", isSelected);
                otherButton.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );
            });

            galleryItems.forEach(function (item) {
                const category =
                    item.getAttribute("data-gallery-category");

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === category;

                item.hidden = !shouldShow;
            });
        });
    });
}


// ============================================================
// 6. BOOKING PACKAGE PREFILL
// Supports package links such as:
// book-now.html?package=enhance-gold
// book-now.html?package=enhance-elite
// book-now.html?package=enhance-showroom
//
// This preselects a matching form field if it exists.
// It does not submit a booking or send customer information.
// ============================================================

function initializeBookingPackage() {
    const parameters = new URLSearchParams(window.location.search);
    const requestedPackage = parameters.get("package");

    if (!requestedPackage) return;

    const allowedPackages = {
        "enhance-gold": "Enhance Gold",
        "enhance-elite": "Enhance Elite",
        "enhance-showroom": "Enhance Showroom"
    };

    const selectedPackage = allowedPackages[
        requestedPackage.toLowerCase()
    ];

    if (!selectedPackage) return;

    // Try common booking form field names.
    const packageField = document.querySelector(
        '[name="package"], ' +
        '[name="service"], ' +
        '[name="servicePackage"], ' +
        "#package, #service"
    );

    if (!packageField) return;

    if (packageField.tagName === "SELECT") {
        const options = Array.from(packageField.options);

        const matchingOption = options.find(function (option) {
            const optionValue = option.value.trim().toLowerCase();
            const optionText = option.textContent.trim().toLowerCase();

            return (
                optionValue === requestedPackage.toLowerCase() ||
                optionText === selectedPackage.toLowerCase()
            );
        });

        if (matchingOption) {
            packageField.value = matchingOption.value;
            packageField.dispatchEvent(
                new Event("change", { bubbles: true })
            );
        }

        return;
    }

    if (
        packageField.tagName === "INPUT" &&
        ["text", "hidden"].includes(packageField.type)
    ) {
        packageField.value = selectedPackage;
        packageField.dispatchEvent(
            new Event("input", { bubbles: true })
        );
        packageField.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }
}


// ============================================================
// 7. FORM ENHANCEMENTS
// Adds a submitting class only when a form is actually submitted.
// Does not intercept or replace the form's existing submission.
// ============================================================

function initializeFormEnhancements() {
    const forms = document.querySelectorAll(
        "form[data-emr-form]"
    );

    forms.forEach(function (form) {
        form.addEventListener("submit", function () {
            form.classList.add("is-submitting");

            const submitButton = form.querySelector(
                'button[type="submit"], ' +
                'input[type="submit"]'
            );

            if (submitButton) {
                submitButton.setAttribute("aria-busy", "true");
            }
        });
    });
}


// ============================================================
// 8. OPTIONAL SCROLL REVEAL ANIMATIONS
//
// Add data-reveal to elements you want to animate.
// Example: <div data-reveal>...</div>
//
// Elements remain visible if IntersectionObserver is unsupported
// or if the visitor prefers reduced motion.
// ============================================================

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll(
        "[data-reveal]"
    );

    if (!revealElements.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

        return;
    }

    revealElements.forEach(function (element) {
        element.classList.add("reveal-pending");
    });

    const observer = new IntersectionObserver(
        function (entries, activeObserver) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                entry.target.classList.remove("reveal-pending");

                activeObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}


// ============================================================
// END OF ENHANCE MY RIDE SHARED JAVASCRIPT
// ============================================================
