import Shiva from "./shiva.js";
import { data } from "../../home/home.js";
Shiva.createData(data, 'main'); // Renders elements into the DOM under the 'main' element or selector.




const loadAbout = function () {
    openNav();

    Shiva.fetchData({
        src: './src/js/mario.js', // Path to the JavaScript file
        statement: 'import shiva from "./shiva.js"; ', // Script statement to execute (e.g., import statements)
        type: 'module' // Script type (e.g., module or text/javascript)
      }, 'main').then(message => {
        console.log(message); // Output: Script loaded and executed successfully
      }).catch(error => {
        console.error(error); // Output: Error loading script: <error message>
      });
}
// const loadAbout = function () {
// }

window.loadAbout = loadAbout;

