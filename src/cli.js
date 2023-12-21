const { mdLinks } = require("./index");

const validate = process.argv.includes("--validate");
const routeUser = process.argv[2];


mdLinks(routeUser, validate)
  .then((res) => console.log("Esta es la respuesta: ", res))
  .catch((error) => console.log("Este es el error: ", error));
