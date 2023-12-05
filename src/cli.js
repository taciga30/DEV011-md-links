const { mdLinks } = require('./index');
mdLinks('C/hola.md')
  .then(() => {})
  .catch((error) => { console.log(error)});
