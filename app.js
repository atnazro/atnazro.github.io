import Shiva from "./src/js/shiva.js";


const loadHomePage = function () {
  Shiva.fetchData("./src/home/home.js", "main").then(message => console.log(message))
    .catch(error => console.error(error));
}

const loadAboutPage = function () {
  openNav();
  Shiva.fetchData('./src/home/about/about.js', 'main')
    .then(message => console.log(message))
    .catch(error => console.error(error));
}

window.loadHomePage = loadHomePage;
window.loadAboutPage = loadAboutPage;

