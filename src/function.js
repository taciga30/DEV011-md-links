//módulos de node.js
const path = require("path");
const fs = require("fs");
const marked = require("marked");
const { JSDOM } = require("jsdom");

const axios = require ("axios");

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
  return new Promise((resolve, reject) => {
    fs.access(relativeToAbsolute, (err, data) => {
      if (err) {
        reject("La ruta no existe");
      } else {
        resolve(data);
      }
    });
  });
};
// --------------------Validar que el archivo de la ruta sea Markdown

const validateExt = (route) => {
  const ext = extension(route);
  return (
    ext === ".md" ||
    ext === ".mkd" ||
    ext === ".mdwn" ||
    ext === ".mdown" ||
    ext === ".mdtxt" ||
    ext === ".mdtext" ||
    ext === ".markdown" ||
    ext === ".text"
  );
};

//----------------------Leer el archivo y mostrar el contenido en un console.log()

const readMd = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, "utf-8", (err, data) => {
      if (err) reject("Error al leer el archivo");
      resolve(data);
    });
  });
};

//---------------------Extraer los links del archivo en un array de objetos

const extractLinks = (data, file) => {
  const arrObjs = [];
  // marked convierte el contenido en un archivo HTML
  const html = marked.parse(data);
  const dom = new JSDOM(html);
  const nodeListA = dom.window.document.querySelectorAll("a");
  nodeListA.forEach((atag) => {
    if (atag.href.startsWith("http://") || atag.href.startsWith("https://")) {
        arrObjs.push({
        href: atag.href,
        text: atag.textContent,
        file,
      });
    }
  });
  return arrObjs;
};

const validateLinks = (arrObjs=[]) => {
  const arrObjsModificado = arrObjs.map((element) => {
    // console.log(element);
    return axios.get(element.href)
    .then((response) =>{
      return {
        ...element,
        status: response.status,
        ok: response.statusText
      }
    })
    .catch((error) => {
      return{
        ...element,
        status: error.response.status,
        ok: error.response.statusText,
      }
    })
  })
  
  return Promise.all(arrObjsModificado);    
};


module.exports = {
  routeIsAbsolute,
  relativeToAbsolute,
  routeExist,
  extension,
  validateExt,
  readMd,
  extractLinks,
  validateLinks
};
