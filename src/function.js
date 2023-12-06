//módulos de node.js
const path = require("path");
const fs = require("fs");

// ------------------Validar si la ruta es absoluta
// .isAbsolute es un método de path, valida si la ruta es absoluta y devuelve true
const routeIsAbsolute = (route) => path.isAbsolute(route);

// ------------------Convertir la ruta en absoluta si es relativa
const relativeToAbsolute = (route) => {
  return routeIsAbsolute(route) ? route : path.resolve(route);
};

// ----------------Verificar la extensión del archivo que sea .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text
// path.extname es un método de path, devuelve la extensión del archivo
const extension = (route) => path.extname(route);

// -------------------Comprobar si la ruta existe en el computador
const routeExist = (relativeToAbsolute) => {
  return fs.existsSync(relativeToAbsolute);
}; 
// --------------------Validar que el archivo de la ruta sea Markdown  

const validateExt = (route) => {
  return extension(route) === ".md" ||
  ".mkd" ||
  ".mdwn" ||
  ".mdown" ||
  ".mdtxt" ||
  ".mdtext" ||
  ".markdown" ||
  ".text" ? true : 'archivo inválido';
};

      //----------------------Leer el archivo y mostrar el contenido en un console.log()
    //   const readMd = (route) => {
    //     try {
    //   const readData = fs.readFile(route, 'utf8');
    //   console.log(readData);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
      //---------------------Extraer los links del archivo en un array de objetos
  //    else {
  //     // console.log("El archivo no es de tipo .md, .mkd, .mdwn, .mdown, .mdtxt, .mdtext, .markdown, .text");
    
  // } else {
  //   // throw new Error("La ruta no existe");
  // }


module.exports = {
  routeIsAbsolute,
  relativeToAbsolute,
  routeExist,
  extension,
  validateExt
};
