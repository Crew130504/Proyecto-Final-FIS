const app = require('../src/app')
const mysql = require('../src/DB/mysql')
const request = require('supertest')

beforeAll(async () => {
    await mysql.conexionDB()
})

afterAll(async () => {
    await mysql.cerrarConexion()
});

describe('/GET /:idVenta', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/ventas/1').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /usuario/:cedula', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/ventas/usuario/2222').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /usuario/estado', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/ventas/usuario/estado').send({
            cedula: 9999,
            estado: 1
        })
        expect(response.status).toBe(200)
    })
});

describe('/POST /crearVenta', () => {
    test('Responde con 201', async () => {
        const hoy = new Date()
        const response = await request(app).post('/ventas/crearVenta').send({
            fecha: hoy.toISOString().split('T')[0], 
            valorTotal: 100000,
            cedula: 9999,
            idEstadoVenta: 1
        })
        expect(response.status).toBe(201)
    })
});