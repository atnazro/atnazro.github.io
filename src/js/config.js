// Initial state of the navigation menu
let isNavOpen = false;

// Function to toggle the navigation menu
const openNav = function () {

    // Select the navigation element
    const navElement = document.querySelector(".nav");

    if (!isNavOpen) {
        // If the menu is closed, open it
        navElement.style.width = "100%";
        isNavOpen = true;
    } else {
        // If the menu is open, close it
        navElement.style.width = "0%";
        isNavOpen = false;
    }
}
