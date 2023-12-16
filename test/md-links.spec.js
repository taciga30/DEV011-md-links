const { mdLinks } = require("../src/index");
const {
  routeIsAbsolute,
  relativeToAbsolute,
  readMd,
} = require("../src/function");

describe("mdLinks", () => {
  it("Debería devolver una promesa", () => {
    const resultado = mdLinks("./README.md");
    expect(typeof resultado.then).toBe("function");
  });

  it('Debería rechazar cuando el path no existe', () => {
    return mdLinks('C:/01-milestone').catch((error)=>{
      expect(error).toBe('La ruta no existe');
    })
  });

  it("Debería devolver false cuando es relativa", () => {
    const isAbsolute = routeIsAbsolute("test/ReadMePrueba.md");
    expect(isAbsolute).toBe(false);
  });

  // it('Debería rechazar cuando el path no existe', () => {
  //     expect(relativeToAbsolute('docs/01-milestone.md')).toBe('C:/Users/tacig/OneDrive/TATIS/Documentos/Tatis/Educación/Cursos y Capacitaciones/Laboratoria/Bootcamp Desarrollo Web/Proyectos/Proyecto 4 Md Links/DEV011-md-links/docs/01-milestone.md');
  //   })

  it("Debe traer la data", () => {
    const resultado =
      "[Documentación oficial](https://nodejs.org/es/about/),[Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw),[Asíncronía en js](https://carlosazaustre.es/manejando-la-asincronia-en-javascript),[mozilla.org](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions)";
    const obteinData = readMd("test/ReadMePrueba.md");
    expect(obteinData).resolves.toBe(resultado);
  });
});
