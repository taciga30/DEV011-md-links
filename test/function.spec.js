const {
    // routeIsAbsolute,
    // relativeToAbsolute,
    // readMd,
    // routeExist,
    // extension,
    // validateExt,
    // extractLinks,
    validateLinks,
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
            // console.log(links);
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
});
