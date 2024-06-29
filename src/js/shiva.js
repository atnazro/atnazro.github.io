/**
 * The Shiva class provides methods for dynamically creating and manipulating DOM elements
 * based on structured data, applying metadata such as CSS styles, scripts, events,
 * tags, categories, and specific attributes for different HTML elements.
 *
 * @version 2024.1
 * @autor Chauhan Pruthviraj
 * @contact nazrotech@outlook.com
 * @license Anyone can use this code, but modifications are prohibited.
 */
class Shiva {
    /**
     * Creates DOM elements based on provided data and appends them to a target element in the DOM.
     * @param {Array} data - The structured data defining elements to be created.
     * @param {string|HTMLElement} target - Selector string or DOM element where created elements will be appended.
     */
    static createData(data, target) {
        'use strict';

        const targetElement = Shiva.getTargetElement(target);

        // Clean target element before adding new data
        Shiva.cleanTargetElement(targetElement);

        /**
         * Creates a DOM element based on the elementType and its data.
         * Applies metadata if available.
         * @param {Object} node - The node object defining element type and data.
         * @returns {HTMLElement} The created DOM element.
         */
        function createElement(node) {
            const element = document.createElement(node.elementType);

            switch (node.elementType) {
                case 'p':
                    element.textContent = node.data.text || '';
                    break;
                case 'img':
                    element.src = node.data.path || '';
                    element.alt = node.data.alt || '';
                    break;
                case 'video':
                    element.src = node.data.path || '';
                    element.controls = node.data.controls || false;
                    element.type = node.data.type || '';
                    if (node.data.loop) {
                        element.loop = true;
                    }
                    break;
                case 'script':
                    element.src = node.data.path || '';
                    Shiva.loadScript(element);
                    break;
                case 'div':
                    if (node.data.children) {
                        Shiva.createData(node.data.children, element);
                    }
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    element.textContent = node.data.text || '';
                    break;
                case 'nav':
                case 'footer':
                case 'caption':
                    element.textContent = node.data.text || '';
                    if (node.data.children) {
                        Shiva.createData(node.data.children, element);
                    }
                    break;
                default:
                    throw new Error(`Unknown element type: ${node.elementType}`);
            }

            // Apply CSS if available
            if (node.data.css) {
                Shiva.applyCSSStyles(element, node.data.css);
            }

            // Apply scripts if available
            if (node.data.script) {
                Shiva.applyScript(element, node.data.script);
            }

            // Apply events if available
            if (node.data.events) {
                Shiva.applyEvents(element, node.data.events);
            }

            // Apply classes if available
            if (node.data.class) {
                Shiva.applyClasses(element, node.data.class);
            }

            // Apply ID if available
            if (node.data.id) {
                Shiva.applyId(element, node.data.id);
            }

            return element;
        }

        // Iterate through data and create elements
        data.forEach(node => {
            const createdElement = createElement(node);
            targetElement.appendChild(createdElement);
        });
    }

    /**
     * Loads a script dynamically into a DOM element and cleans up after execution.
     * @param {HTMLScriptElement} scriptElement - The script element to load.
     */
    static loadScript(scriptElement) {
        scriptElement.type = 'module'; // Set type to module
        scriptElement.onload = () => scriptElement.remove(); // Remove script after execution
        document.body.appendChild(scriptElement); // Append script to body to initiate loading
    }

    /**
     * Applies CSS styles to a DOM element.
     * @param {HTMLElement} element - The DOM element to apply CSS styles to.
     * @param {Object} styles - CSS styles object with style properties and values.
     */
    static applyCSSStyles(element, styles) {
        Object.keys(styles).forEach(style => {
            element.style[style] = styles[style];
        });
    }

    /**
     * Applies script(s) to a DOM element.
     * @param {HTMLElement} element - The DOM element to append script(s) to.
     * @param {string|string[]} scripts - Script source URL(s) or an array of script URLs.
     */
    static applyScript(element, scripts) {
        const scriptArray = Array.isArray(scripts) ? scripts : [scripts];
        scriptArray.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            Shiva.loadScript(scriptElement); // Load script dynamically
            element.appendChild(scriptElement);
        });
    }

    /**
     * Applies event listeners to a DOM element.
     * @param {HTMLElement} element - The DOM element to add event listeners to.
     * @param {Object} events - Event object containing event types and handler functions.
     */
    static applyEvents(element, events) {
        Object.keys(events).forEach(eventType => {
            element.addEventListener(eventType, events[eventType]);
        });
    }

    /**
     * Applies classes to a DOM element.
     * @param {HTMLElement} element - The DOM element to apply classes to.
     * @param {string|string[]} classes - Class name(s) or an array of class names.
     */
    static applyClasses(element, classes) {
        const classArray = Array.isArray(classes) ? classes : [classes];
        element.classList.add(...classArray);
    }

    /**
     * Applies ID to a DOM element.
     * @param {HTMLElement} element - The DOM element to apply ID to.
     * @param {string} id - ID to apply to the element.
     */
    static applyId(element, id) {
        element.id = id;
    }

    /**
     * Retrieves the target element from the DOM based on provided target (selector string or HTMLElement).
     * @param {string|HTMLElement} target - Selector string or DOM element representing the target.
     * @returns {HTMLElement} The target element in the DOM.
     * @throws {Error} If target element is not found or invalid target is provided.
     */
    static getTargetElement(target) {
        let targetElement;

        if (typeof target === 'string') {
            targetElement = document.querySelector(target);
            if (!targetElement) {
                throw new Error(`Target element not found: ${target}`);
            }
        } else if (target instanceof HTMLElement) {
            targetElement = target;
        } else {
            throw new Error('Invalid target provided. Must be a selector string or a DOM element.');
        }

        return targetElement;
    }

    /**
     * Cleans up the target element by removing all child nodes.
     * @param {HTMLElement} target - The target element to clean up.
     */
    static cleanTargetElement(target) {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }

    /**
     * Creates a table element based on provided data structure and appends it to a target element.
     * @param {HTMLElement} target - The target element where the table will be appended.
     * @param {Object} data - The data defining the table structure and content.
     */
    static createTable(target, data) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');

        // Create table headers
        data.headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table rows and cells
        data.rows.forEach(rowData => {
            const tr = document.createElement('tr');
            rowData.forEach(cellData => {
                const td = document.createElement('td');
                td.textContent = cellData;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        target.appendChild(table);
    };

    static fetchData(data = {}, targetElement) {
        return new Promise((resolve, reject) => {
            // Create a script element
            let script = document.createElement('script');

            // Set script attributes
            script.src = data.src; // Source URL of the script file
            if (data.statement) {
                script.textContent = data.statement; // Script code to execute
            }
            script.type = data.type || 'text/javascript'; // Script type (defaults to JavaScript)

            // Define onload and onerror handlers
            script.onload = () => {
                resolve('Script loaded and executed successfully');

                // Remove the script element after execution
                script.remove();
            };

            script.onerror = (error) => {
                reject(`Error loading script: ${error}`);

                // Remove the script element on error (if needed)
                script.remove();
            };

            // Find the target element where script should be appended
            const target = document.querySelector(targetElement);
            if (!target) {
                reject(`Target element '${targetElement}' not found.`);
                return;
            }

            // Append the script to the target element to initiate loading and execution
            target.appendChild(script);
        });
    }

}

export default Shiva;
