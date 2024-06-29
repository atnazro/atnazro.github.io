/**
 * The Shiva class provides methods for dynamically creating and manipulating DOM elements
 * based on structured data, applying metadata such as CSS styles, scripts, events,
 * tags, categories, and specific attributes for different HTML elements.
 *
 * @version 2024.1
 * @author Chauhan Pruthviraj
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
         * Creates a DOM element based on the node type and its data.
         * Applies metadata if available.
         * @param {Object} node - The node object defining element type and data.
         * @returns {HTMLElement} The created DOM element.
         */
        function createElement(node) {
            let element;

            switch (node.type) {
                case 'text':
                    element = document.createElement('p');
                    element.textContent = node.data;
                    break;
                case 'image':
                    element = document.createElement('img');
                    element.src = node.data.path;
                    element.alt = node.metaData.alt || ''; // Alt text for images
                    break;
                case 'video':
                    element = document.createElement('video');
                    element.src = node.data.path;
                    element.controls = node.data.controls || false; // Video controls
                    element.type = node.data.type || ''; // Video MIME type
                    if (node.data.loop) {
                        element.loop = true; // Video loop attribute
                    }
                    break;
                case 'script':
                    element = document.createElement('script');
                    element.src = node.data.path;
                    Shiva.loadScript(element); // Load script dynamically
                    break;
                case 'element':
                    element = document.createElement('div');
                    Shiva.createData(node.data, element); // Recursively create nested elements
                    break;
                case 'table':
                    element = document.createElement('table');
                    Shiva.createTable(element, node.data); // Create table with data
                    break;
                case 'heading':
                    element = document.createElement(`h${node.data.level}`);
                    element.textContent = node.data.text;
                    break;
                case 'paragraph':
                    element = document.createElement('p');
                    element.textContent = node.data.text;
                    break;
                case 'nav':
                    element = document.createElement('nav');
                    Shiva.createData(node.data, element); // Create navigation elements
                    break;
                case 'footer':
                    element = document.createElement('footer');
                    element.textContent = node.data.text;
                    break;
                case 'caption':
                    element = document.createElement('caption');
                    element.textContent = node.data.text;
                    break;
                default:
                    throw new Error(`Unknown element type: ${node.type}`);
            }

            // Apply metadata if available
            if (node.metaData) {
                Shiva.applyMetadata(element, node.metaData);
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
     * Applies metadata properties (e.g., CSS styles, scripts, events) to a DOM element.
     * @param {HTMLElement} element - The DOM element to apply metadata to.
     * @param {Object} metaData - Metadata object containing CSS styles, scripts, events, tags, and category.
     */
    static applyMetadata(element, metaData) {
        if (metaData.css) {
            Shiva.applyCSSStyles(element, metaData.css);
        }
        if (metaData.script) {
            Shiva.applyScript(element, metaData.script);
        }
        if (metaData.events) {
            Shiva.applyEvents(element, metaData.events);
        }
        if (metaData.tags) {
            Shiva.applyTags(element, metaData.tags);
        }
        if (metaData.category) {
            Shiva.applyCategory(element, metaData.category);
        }
        if (metaData.class) {
            Shiva.applyClasses(element, metaData.class);
        }
        if (metaData.id) {
            Shiva.applyId(element, metaData.id);
        }
        if (metaData.other) {
            Shiva.applyOtherMetadata(element, metaData.other);
        }
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
        Object.keys(events).forEach(key => {
            const event = events[key];
            element.addEventListener(event.type, event.run);
        });
    }

    /**
     * Applies tags to a DOM element using a dataset attribute.
     * @param {HTMLElement} element - The DOM element to apply tags to.
     * @param {string[]} tags - Array of tags to apply to the element.
     */
    static applyTags(element, tags) {
        element.dataset.tags = tags.join(', ');
    }

    /**
     * Applies category information to a DOM element using a dataset attribute.
     * @param {HTMLElement} element - The DOM element to apply category information to.
     * @param {Object} category - Category object containing main and sub categories.
     */
    static applyCategory(element, category) {
        element.dataset.category = JSON.stringify(category);
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
     * Applies other metadata properties to a DOM element.
     * @param {HTMLElement} element - The DOM element to apply metadata to.
     * @param {Object} other - Other metadata properties to apply.
     */
    static applyOtherMetadata(element, other) {
        for (let key in other) {
            // Check if the key is a valid HTML attribute name
            if (/^[a-zA-Z]+[\w-]*$/.test(key)) {
                element.dataset[key] = other[key];
            } else {
                console.warn(`Invalid metadata key: ${key}. Skipping...`);
            }
        }
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
     * @param {Array} data - The data defining the table structure and content.
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
    }
}

export default Shiva;

