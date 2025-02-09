const app = require('../src/app')
const mysql = require('../src/DB/mysql')
const request = require('supertest')

beforeAll(async () => {
    await mysql.conexionDB()
})

afterAll(async () => {
    await mysql.cerrarConexion()
});

describe('/GET /', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/estampas/').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /:codigoEstampa', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/estampas/1').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /artista/:cedula', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/estampas/artista/2222').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /clasificacion/:idClasificacion', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/estampas/clasificacion/1').send()
        expect(response.status).toBe(200)
    })
});

describe.skip('/POST /crearEstampa', () => {
    test('Responde con 201', async () => {
        mysql.ejecutarQuery('delete from estampas where nombreEstampa = "Estampa test"')
        const response = await request(app).post('/estampas/crearEstampa').send({
            nombreEstampa: "Estampa test",
            descripcionEstampa: "Test",
            precio: 1000,
            stock: 10,
            idClasificacion: 1,
            idEstadoEstampa: 1,
            cedula: 1010
        })
        expect(response.status).toBe(201)
    })
});

describe.skip('/PUT /modificarEstampa', () => {
    test('Responde con 201', async () => {
        mysql.ejecutarQuery('delete from estampas where nombreEstampa = "Estampa test"')
        const response = await request(app).put('/estampas/modificarEstampa').send({
            nombreEstampa: "Estampa test",
            descripcionEstampa: "Test",
            precio: 1000,
            stock: 10,
            idClasificacion: 1,
            idEstadoEstampa: 1,
            cedula: 1010,
            codigoEstampa: 1
        })
        expect(response.status).toBe(201)
    })
})