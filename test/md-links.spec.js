const { mdLinks } = require('../src/index');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Debería devolver una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('Debería rechazar cuando el path no existe', () => {
    return mdLinks('C:/01-milestone.md').catch((error)=>{
      expect(error).toBe('La ruta no existe');
    })
  });
});
