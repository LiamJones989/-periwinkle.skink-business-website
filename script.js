
/* ==========================================
   PERIWINKLE SKINK
   Website JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#main-nav");

    if (menuToggle && nav) {

        // Open and close the mobile menu
        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        // Close the menu when a navigation link is clicked
        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

        // Close the menu when clicking outside it
        document.addEventListener("click", (event) => {

            const clickedInsideNav = nav.contains(event.target);
            const clickedMenuButton = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedMenuButton) {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        });

        // Close the menu when Escape is pressed
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" && nav.classList.contains("open")) {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.focus();

            }

        });

        // Close the mobile menu when switching to desktop width
        window.addEventListener("resize", () => {

            if (window.innerWidth > 700) {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        });

    }


    // ==========================================
    // GALLERY IMAGE FALLBACKS
    // ==========================================

    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    galleryImages.forEach((img) => {

        // Show a decorative fallback if an image fails to load
        const showImageFallback = () => {

            const galleryItem = img.closest(".gallery-item");

            if (galleryItem) {

                galleryItem.classList.add("image-missing");
                img.style.display = "none";

            }

        };

        img.addEventListener("error", showImageFallback);

        // Handle images that failed before the listener was added
        if (img.complete && img.naturalWidth === 0) {

            showImageFallback();

        }

    });


    // ==========================================
    // AUTOMATIC COPYRIGHT YEAR
    // ==========================================

    const yearElement = document.querySelector("#year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // ==========================================
    // SMOOTH SECTION NAVIGATION
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            // Ignore empty anchor links
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            // Respect the visitor's reduced-motion preference
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            targetElement.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            // Update the address bar without reloading the page
            if (window.location.hash !== targetId) {

                history.replaceState(null, "", targetId);

            }

        });

    });


    // ==========================================
    // WEBSITE INITIALIZATION
    // ==========================================

    console.log("Periwinkle Skink website is ready!");

});
