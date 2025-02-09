const app = require('../src/app')
const mysql = require('../src/DB/mysql')
const request = require('supertest')

beforeAll(async () => {
    await mysql.conexionDB()
})

afterAll(async () => {
    await mysql.cerrarConexion()
});

describe('/GET /:codigo', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/camisetas/1').send()
        expect(response.status).toBe(200)
    })
});

describe('/GET /venta/:idVenta', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/camisetas/venta/1').send()
        expect(response.status).toBe(200)
    })
});

describe('/POST /crearCamiseta', () => {
    test('Responde con 201', async () => {
        mysql.ejecutarQuery('delete from camisetas where codigoCamiseta = 13')
        const response = await request(app).post('/camisetas/crearCamiseta').send({
            color: 'Azul',
            precio: 1000,
            talla: 'M',
            idVenta: 1,
            idPosicion: 1,
            idMaterial: 1, 
            codigoEstampa: 1
        })
        expect(response.status).toBe(201)
    })
});
