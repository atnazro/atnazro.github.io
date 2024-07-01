/**
 * Class Shiva - Handles dynamic script loading, data fetching, cleanup, and navigation toggle.
 */
class Shiva {
    /**
     * Static variable to track the state of the navigation.
     * @type {boolean}
     */
    static isNavOpen = false;

    /**
     * Fetches data by dynamically loading a script from the specified path, inserts the data into the web,
     * and then removes the script element from the DOM.
     *
     * @param {string} path - The source path of the script to be loaded.
     * @param {string} targetSelector - The CSS selector of the DOM element to which the script will be appended.
     * @param {Function} callback - The function to process the fetched data.
     */
    static fetch(path, targetSelector, callback) {
        try {
            // Validate the path
            if (typeof path !== 'string' || path.trim() === '') {
                throw new Error('Invalid script path provided.');
            }
            
            // Validate the target selector
            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                throw new Error(`Target element not found for selector: ${targetSelector}`);
            }

            // Create a new script element securely
            const script = document.createElement("script");
            script.setAttribute("src", path);
            script.setAttribute("type", "module");
            script.setAttribute("async", "true");

            // Add an event listener to handle the script once it has loaded
            script.onload = () => {
                try {
                    if (typeof callback === 'function') {
                        callback();
                    }
                } catch (err) {
                    console.error('Error executing callback:', err);
                } finally {
                    Shiva._removeScript(script);
                }
            };

            // Handle errors in loading the script
            script.onerror = () => {
                console.error(`Failed to load script at ${path}`);
                Shiva._removeScript(script);
            };

            // Append the script to the target element
            targetElement.appendChild(script);
        } catch (err) {
            console.error('Error in fetch method:', err);
        }
    }

    /**
     * Private method to remove the script element from the DOM.
     *
     * @param {HTMLScriptElement} script - The script element to be removed.
     * @private
     */
    static _removeScript(script) {
        if (script.parentElement) {
            script.parentElement.removeChild(script);
        }
    }

    /**
     * Toggles the navigation state by expanding or collapsing the navigation bar.
     */
    static toggleNav() {
        const navElement = document.querySelector(".nav");
        if (!navElement) {
            console.error('Navigation element not found with selector: .nav');
            return;
        }

        if (Shiva.isNavOpen) {
            navElement.style.width = "0%";
        } else {
            navElement.style.width = "100%";
        }

        Shiva.isNavOpen = !Shiva.isNavOpen;
    }
}

// Example usage of fetching data and toggling navigation:
// Shiva.fetch('path/to/your/script.js', '#targetElement', () => {
//     // Callback function to handle data insertion or processing
//     console.log('Data fetched and script cleaned up.');
// });

// Shiva.toggleNav(); // Call this method to toggle the navigation state.
