const { mdLinks } = require('../src/index');
const { routeIsAbsolute, relativeToAbsolute } = require('../src/function');

describe('mdLinks', () => {

  it('Debería devolver una promesa', () => {
    const resultado = mdLinks('./README.md');
    expect(typeof (resultado.then)).toBe('function');
  });

  it('Debería rechazar cuando el path no existe', () => {
    return mdLinks('C:/01-milestone').catch((error)=>{
      expect(error).toBe('La ruta no existe');
    })
  });

  it('Debería devolver false cuando es relativa', () => {
    return routeIsAbsolute('docs/01-milestone.md').catch((error)=>{
      expect(error).toBe('false');
    })
  });

  it('Debería rechazar cuando el path no existe', () => {
      expect(relativeToAbsolute('docs/01-milestone.md')).toBe('C:/Users/tacig/OneDrive/TATIS/Documentos/Tatis/Educación/Cursos y Capacitaciones/Laboratoria/Bootcamp Desarrollo Web/Proyectos/Proyecto 4 Md Links/DEV011-md-links/docs/01-milestone.md');
    })


});
