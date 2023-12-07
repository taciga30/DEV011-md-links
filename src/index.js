
const { routeIsAbsolute, relativeToAbsolute, routeExist, extension, validateExt, readMd } = require("./function");

const mdLinks = (path) => {
  // resolve y reject son funciones que se convierten en callbacks en el then y el catch
  return new Promise((resolve, reject)=>{
    const validateAbsolute = routeIsAbsolute(path);
    const routeAbsolute = relativeToAbsolute(path);
    const validateRoute = routeExist(path);
    const mostrarExt = extension(path);
    const validateExtFile = validateExt(path);
    const readFile = readMd(path);
    readFile.then(res => console.log({res}))
    .catch(err => console.log(err))
    const functions ={
      validateAbsolute,
      routeAbsolute,
      validateRoute,
      mostrarExt,
      validateExtFile,
      readFile
    }
    
    resolve(functions);
    // Si no existe la ruta rechaza la promesa
    reject("La ruta no existe");
  });
};

// Desde este archivo debes exportar la función (mdLinks)
module.exports = {
  mdLinks
};
