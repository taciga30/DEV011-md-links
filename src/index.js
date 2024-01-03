const {
  relativeToAbsolute,
  routeExist,
  readMd,
  extractLinks,
  validateLinks,
  statsLinks,
} = require('./function');

const mdLinks = (path, validate, stats) => {
// resolve y reject son funciones que se convierten en callbacks en el then y el catch
  return new Promise((resolve, reject) => {
    const routeAbsolute = relativeToAbsolute(path);

    routeExist(routeAbsolute).catch((err) => reject(err));

    readMd(routeAbsolute)
      .then((data) => {
        const linksExtracted = extractLinks(data, routeAbsolute);
        if (validate && stats) {
            const linksBroken = statsLinks(linksExtracted, true);
            resolve(linksBroken);
          } else if(validate){
            const linksValidate = validateLinks(linksExtracted);
            resolve(linksValidate);
          }
        else if(stats){
          const linksStats = statsLinks(linksExtracted, false)
          resolve(linksStats);
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
