//módulos de node.js
const path = require("path");
const fs = require("fs");
const readFileFsPromise = require("fs/promises");
const marked = require("marked");
const { JSDOM } = require("jsdom");

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
  console.log(extension(route));
  return extension(route) === ".md" ||
    ".mkd" ||
    ".mdwn" ||
    ".mdown" ||
    ".mdtxt" ||
    ".mdtext" ||
    ".markdown" ||
    ".text"
    ? true
    : "archivo inválido";
};

//----------------------Leer el archivo y mostrar el contenido en un console.log()
// const readMd = (route) => {
// const readData = readFileFsPromise.readFile(route, 'utf-8');
// const linksExtracted = extractLinks(readData)
// return linksExtracted;
// };
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
  const html = marked.parse(data);
  const dom = new JSDOM(html);
  const nodeListA = dom.window.document.querySelectorAll("a");
  nodeListA.forEach((atag) => {
    if (atag.href.startsWith("http://") || atag.href.startsWith("https://")){
      arrObjs.push({
        href: atag.href,
        text: atag.textContent,
        file
      });
    }
  });
  console.log(arrObjs.length);
  return arrObjs;
  
};

module.exports = {
  routeIsAbsolute,
  relativeToAbsolute,
  routeExist,
  extension,
  validateExt,
  readMd,
  extractLinks,
};
