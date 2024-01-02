const {
    validateLinks,
    statsLinks
} = require("../src/function");

const axios = require("axios");

jest.mock("axios");

beforeEach(() => {
    axios.get.mockClear();
});

// ------------------------- Validación de que la función validateLinks devuelva el array validado --------------------
describe("functions", () => {
    it("Debe devolver el array validado", (done) => {
        const array = [
            {
                href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions",
                text: "mozilla.org",
                file: "C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md",
            },
        ];
        axios.get.mockImplementation(() =>
            Promise.resolve({ status: 200, statusText: "OK" })
        );
        const validate = validateLinks(array);
        validate.then((links) => {
            expect(links).toEqual([
                {
                    href: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions",
                    text: "mozilla.org",
                    file: "C:\\Users\\tacig\\OneDrive\\TATIS\\Documentos\\Tatis\\Educación\\Cursos y Capacitaciones\\Laboratoria\\Bootcamp Desarrollo Web\\Proyectos\\Proyecto 4 Md Links\\DEV011-md-links\\test\\ReadMePrueba.md",
                    status: 200,
                    ok: "OK",
                },
            ]);
            done();
        });
    });

    it("Debe devolver las estadísticas de los links validados", () => {
        const resultado = { Total: 4, Unique: 4, Broken: 1 };
        const stastTest = statsLinks("test/ReadMePrueba.md", '--validate --stats');
        expect(stastTest).toEqual(resultado);
    });
});
