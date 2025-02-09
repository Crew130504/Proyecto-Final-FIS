const app = require('../src/app')
const mysql = require('../src/DB/mysql')
const request = require('supertest')

beforeAll(async () => {
    await mysql.conexionDB()
})

afterAll(async () => {
    await mysql.cerrarConexion()
});

describe('/GET /:cedula', () => {
    test('Responde con 200', async () => {
        const response = await request(app).get('/usuarios/1010').send()
        expect(response.status).toBe(200)
    })
});

describe('/POST /crearUsuario', () => {
    test('Responde con 201', async () => {
        mysql.ejecutarQuery('DELETE FROM Ventas WHERE cedula = 9999')
        mysql.ejecutarQuery('DELETE FROM Usuarios WHERE cedula = 9999')
        const response = await request(app).post('/usuarios/crearUsuario').send({
            cedula: 9999,
            nombre: "Usuario test",
            username: "usernametest",
            contraseña: "PASS",
            direccion: "Direccion test",
            telefono: 123456,
            idRol: 1
        })
        expect(response.status).toBe(201)
    })
    test('Responde con 500, cedula ya esta', async () => {
        const response = await request(app).post('/usuarios/crearUsuario').send({
            cedula: 1010,
            nombre: "Usuario test",
            username: "usernametest",
            contraseña: "PASS",
            direccion: "Direccion test",
            telefono: 123456,
            idRol: 1
        })
        expect(response.status).toBe(500)
    })
});

describe('/POST /login', () => {
    test('Debe retornar 200', async () => {
        const response = await request(app).post('/usuarios/login').send({
            username: "usernametest",
            contraseña: "PASS"
        })
        expect(response.status).toBe(200)
    })
    test('Debe retornar 500, usuario no existe', async () => {
        const response = await request(app).post('/usuarios/login').send({
            username: "usernamenoexiste",
            contraseña: "PASS"
        })
        expect(response.status).toBe(500)
    })
    test('Debe retornar 500, contraseña incorrecta', async () => {
        const response = await request(app).post('/usuarios/login').send({
            username: "usernametest",
            contraseña: "NO_PASS"
        })
        expect(response.status).toBe(500)
    })
})
