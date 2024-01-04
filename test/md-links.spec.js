const { mdLinks } = require('../src/index');
const {
  routeIsAbsolute,
  relativeToAbsolute,
  readMd,
  routeExist,
  extension,
  validateExt,
  extractLinks,
  validateLinks,
  // statsLinks
} = require('../src/function');

// ------------------------- Validación de que la función mdLinks devuelva una promesa --------------------
describe('mdLinks', () => {
  it('Debería devolver una promesa', () => {
    const resultado = mdLinks('./README.md');
    expect(typeof resultado.then).toBe('function');
  });

  // ------------------------- Validación de que la función routeExist devuelva "La ruta no existe" cuando la ruta ingresada no está en el pc --------------------
  it('Debería rechazar cuando el path no existe', () => {
    return routeExist('C:/01-milestone').catch((err) => {
      expect(err).toBe('La ruta no existe');
    });
  });

  // ------------------------- Validación de que la función extension devuelva la extensión del archivo --------------------
  it('Debería devolver la extensión del archivo', () => {
    const ext = extension('test/ReadMePrueba.md');
    expect(ext).toBe('.md');
  });

  // ------------------------- Validación de que la función validateExt devuelva false cuando el archivo no es markdown --------------------
  it('Debería retornar false cuando la extensión del archivo no es .md', () => {
    const ext = validateExt('test/prueba.xml');
    expect(ext).toBe(false);
  });

  // ------------------------- Validación de que la función routeIsAbsolute devuelva false cuando la ruta ingresada es relativa --------------------
  it('Debería devolver false cuando es relativa', () => {
    const isAbsolute = routeIsAbsolute('test/ReadMePrueba.md');
    expect(isAbsolute).toBe(false);
  });

  // ------------------------- Validación de que la función relativeToAbsolute devuelva la ruta relativa ingresada en absoluta --------------------
  it('Debería convertir la ruta en absoluta', () => {
    const convert = relativeToAbsolute('docs/01-milestone.md');
    const result =
      'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\docs\\01-milestone.md';
    expect(convert).toBe(result);
  });

  // ------------------------- Validación de que la función readMd devuelva la data del archivo markdown --------------------
  it('Debe traer la data', () => {
    const resultado = '[Documentación oficial](https://nodejs.org/es/about/),\n[Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw),\n[Asíncronía en js](https://carlosazaustre.es/manejando-la-asincronia-en-javascript),\n[mozilla.org](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions)';
    const obteinData = readMd('test/ReadMePrueba.md');

    obteinData.then((data) => {
      const dataNormalizada = data.replace(/\r\n/g, '\n');
      const resultadoNormalizado = resultado.replace(/\r\n/g, '\n');

      expect(dataNormalizada).toBe(resultadoNormalizado);
    });
  });

  // ------------------------- Validación de que la función readMd devuelva Error al leer el archivo cuando hay error --------------------
  it('Debería devolver Error al leer el archivo al intentar traer la data', () => {
    return readMd('test/prueba.xml').catch((err) => {
      expect(err).toBe('Error al leer el archivo');
    });
  });

  // ------------------------- Validación de que la función extractLinks devuelva un objeto con las keys href, text, file --------------------
  it('Debe traer un array de objetos con las propiedades href, text y file', () => {
    const resultado = `[{href: 'https://www.google.com/',
    text: 'Google',
    file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\prueba.mdtxt'       
  }]`;
    const url =
      'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\prueba.mdtxt';
    const read = readMd(url).then((data) => {
      const obteinData = extractLinks(data, url);
      expect(obteinData).toBeInstanceOf(Array);
    });
  });

  // ------------------------- Validación de que la función validateLinks devuelva un objeto con las keys href, text, file, status, ok --------------------

  it('Debe traer un array de objetos con las propiedades href, text, file, status y ok', () => {
    const mockValidate = [
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Documentación oficial',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 404,
        ok: 'Not Found',
      },
      {
        href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
        text: 'Fazt en YouTube',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
      {
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',
        text: 'mozilla.org',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
    ];
    const validate = true;
    const resultado = mdLinks('test/ReadMePrueba.md', validate).then((data) => {
      expect(data).toEqual(mockValidate);
      // console.log(data);
    });
  });

  it('Debe devolver el array validado', async () => {
    const obteinData = await validateLinks([
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Documentación oficial',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
      },
      {
        href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
        text: 'Fazt en YouTube',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
      },
      {
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',
        text: 'mozilla.org',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
      },
    ]);

    expect(obteinData).toEqual([
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Documentación oficial',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 404,
        ok: 'Not Found',
      },
      {
        href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
        text: 'Fazt en YouTube',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
      {
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',
        text: 'mozilla.org',
        file: 'C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md',
        status: 200,
        ok: 'OK',
      },
    ]);
  });
});
