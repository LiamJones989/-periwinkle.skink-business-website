
/* 
 * Periwinkle Skink
 * Website interactions and functionality
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#main-nav");

    // Open and close the mobile navigation
    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            // Update accessibility information
            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        // Close the menu after clicking a navigation link
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

        // Close the menu when clicking outside of it
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

        // Close the menu when the Escape key is pressed
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

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

    }


    // ==========================================
    // GALLERY IMAGE FALLBACKS
    // ==========================================

    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    galleryImages.forEach((img) => {

        // Show a decorative fallback if an image cannot load
        img.addEventListener("error", () => {

            const galleryItem = img.closest(".gallery-item");

            if (galleryItem) {

                galleryItem.classList.add("image-missing");

                img.style.display = "none";

            }

        });

        // Handle an image that failed before this listener was added
        if (img.complete && img.naturalWidth === 0) {

            const galleryItem = img.closest(".gallery-item");

            if (galleryItem) {

                galleryItem.classList.add("image-missing");

                img.style.display = "none";

            }

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
    // SMOOTH NAVIGATION
    // ==========================================

    // Smooth scrolling is also enabled in style.css.
    // This fallback supports browsers where CSS smooth
    // scrolling is not available.

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            // Ignore empty links
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Update the URL without creating a page reload
                if (window.location.hash !== targetId) {

                    history.replaceState(null, "", targetId);

                }

            }

        });

    });


    // ==========================================
    // WEBSITE INITIALIZATION
    // ==========================================

    console.log("Periwinkle Skink website is ready!");

});
