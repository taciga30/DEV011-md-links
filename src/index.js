const {
  // routeIsAbsolute,
  relativeToAbsolute,
  routeExist,
  // extension,
  // validateExt,
  readMd,
  extractLinks,
  validateLinks
} = require("./function");

const mdLinks = (path, validate) => {
  // resolve y reject son funciones que se convierten en callbacks en el then y el catch
  return new Promise((resolve, reject) => {
    const routeAbsolute = relativeToAbsolute(path);

    routeExist(routeAbsolute).catch((err) => reject(err));

    readMd(routeAbsolute)
      .then((data) => {
        const linksExtracted = extractLinks(data, routeAbsolute);
        if (validate) {
          const linksValidate = validateLinks(linksExtracted);
          resolve(linksValidate);
        }else{
        resolve(linksExtracted);
        }
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  mdLinks,
};
