import Shiva from "./src/js/shiva.js";



const loadHomePage = function () {
  Shiva.fetchData("./src/home/home.js", "main").then(function (msg) {
    console.log(msg);
  }).catch(error => console.error(error));
}

loadHomePage();

const loadAboutPage = function () {
  Shiva.fetchData('./src/home/about/about.js', 'main').then(function (msg) {
    console.log(msg);
  })
    .catch(error => console.error(error));
}

window.loadHomePage = loadHomePage;
window.loadAboutPage = loadAboutPage;

