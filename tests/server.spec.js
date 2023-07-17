const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    test('codigo 200', async () => {
        const response = await request(server).get('/cafes').send()
        expect(response.status).toBe(200)
    })

    it('obteniendo un array', async () => {
        const response = await request(server).post('/cafes').send()
        expect(response.body).toBeInstanceOf(Array)
    })

    it('obteniendo un objeto', async () => {
        const response = await request(server).post('/cafes/1').send()
        expect(response.body).toBeInstanceOf(Object)
    })

    it('eliminar producto que no exista y que de codigo 404', async () => {
        const response = await request(server).delete('/cafe/10').send()
        expect(response.status).toBe(404)
    })

    /* test('codigo 404, ruta no existe', async () => {
        const response = await request(server).get('/cafes/10').send()
        expect(response.status).toBe(404)
    }) */


    /* it("Enviando un nuevo cafe, id random", async () => {
        const id = Math.floor(Math.random() * 999);
        const producto = { id, nombre: "Nuevo cafe" };
        const { body: productos } = await request(server).post("/cafes").send(producto);
        expect(productos).toContainEqual(producto);
    }); */

    it('nuevo cafe y codigo 201, id set', async () => {
        const nuevoCafe = { 'id': 5, 'nombre': "cafesisimo" }
        const response = await request(server).post('/cafes').send(nuevoCafe)
        expect(response.status).toBe(201)
    })

    it('editar cafe que no existe', async () => {
        const id = 1
        const cafe = {id, nombre: 'editar cafe'}
        const response = await request(server).put('/cafes/8').send(cafe)
        expect (response.statusCode).toBe(400)
    })

    /* it("editar cafe, devuelve 400 al ingresar id que no existe", async () => {
        const editarCafe = { id: 1, nombre: "cafe editado" }
        const response = await request(server).put("/cafes/8").send(editarCafe)
        expect(response.statusCode).toBe(400)
    }) */


});
