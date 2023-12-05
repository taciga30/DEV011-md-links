const fs = require('fs')
const functions = require('./function');

const mdLinks = (path, options) => {
  // resolve y reject son funciones que se convierten en callbacks en el then y el catch
  return new Promise((resolve, reject) => {
  // Identifica si la ruta existe
    if(fs.existsSync(path)){
  // Validar si la ruta es 
  
  //Si no es absoluta convertirla

  //Comprobar si la ruta existe en el computador

  //Verificar la extensión del archivo

    }else{
  // Si no existe la ruta rechaza la promesa    
      reject('La ruta no existe');
    }
   
  });

}

module.exports = {
mdLinks
};