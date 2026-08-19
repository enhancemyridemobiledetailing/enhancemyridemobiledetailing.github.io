document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    if (pageLoader) {
        pageLoader.classList.add("loaded");

        setTimeout(function () {
            pageLoader.style.display = "none";
        }, 700);
    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       IMPORTANT:
       DO NOT HIDE PAGE SECTIONS
    ===================================================== */

    const pageSections = document.querySelectorAll(
        "main section, " +
        ".scan-section, " +
        ".transformation-section, " +
        ".actions-section, " +
        ".trust-section, " +
        ".scan-footer, " +
        ".featured-image-wrapper"
    );

    pageSections.forEach(function (section) {

        section.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        section.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        section.style.setProperty(
            "transform",
            "none",
            "important"
        );

    });


    /* =====================================================
       IMAGES
    ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        image.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

    });


    /* =====================================================
       FEATURED IMAGE
    ===================================================== */

    const featuredImage =
        document.querySelector(".featured-image");

    if (featuredImage) {

        featuredImage.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        featuredImage.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        featuredImage.style.setProperty(
            "display",
            "block",
            "important"
        );

    }


    /* =====================================================
       LINKS / BUTTONS
    ===================================================== */

    const links =
        document.querySelectorAll("a");

    links.forEach(function (link) {

        link.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        link.style.setProperty(
            "opacity",
            "1",
            "important"
        );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-ready");


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Enhance My Ride — Landing Page Ready"
    );

});