const { mdLinks } = require("./index");

// const validateLinks = process.argv.includes("--validate");
const routeUser = process.argv[2];
// console.log(routeUser, validateLinks);
// if(validateLinks){
// // se ejecuta la función de validar links
// }else{
// // se entrega el array de los links sin validar
// }

mdLinks(routeUser)
  .then((res) => console.log("Esta es la respuesta: ", res))
  .catch((error) => console.log("Este es el error: ", error));
