const db = require('../DB/mysql')

async function obtenerTodas() {
    const query = 'SELECT * FROM Estampas'
    return db.ejecutarQuery(query)
}

async function obtenerEstampaPorId(codigoEstampa){
    const query = 'SELECT * FROM Estampas WHERE codigoEstampa = ?'
    const params = [codigoEstampa]
    return db.ejecutarQuery(query, params)
}

async function obtenerEstampasPorArtista(cedula){
    const query = 'SELECT * FROM Estampas WHERE cedula = ?'
    const params = [cedula]
    return db.ejecutarQuery(query, params)
}

async function obtenerEstampasPorClasificacion(idClasificacion){
    const query = 'SELECT * FROM Estampas WHERE idClasificacion = ?'
    const params = [idClasificacion]
    return db.ejecutarQuery(query, params)
}

async function crearEstampa(estampa){
    const query = 'INSERT INTO Estampas(nombreEstampa, descripcionEstampa, precio, stock, imagen, cedula) VALUES (?, ?, ?, ?, ?, ?)'
    const params = [estampa.nombreEstampa, estampa.descripcionEstampa, estampa.precio, estampa.stock, estampa.imagen, estampa.cedula]
    return db.ejecutarQuery(query, params)
}

async function modificarEstampa(estampa) {
    const query = 'UPDATE Estampas SET stock = ? WHERE codigoEstampa = ?';
    const params = [estampa.stock, estampa.codigoEstampa];

    console.log('Ejecutando query:', query, 'con parámetros:', params);

    return db.ejecutarQuery(query, params);
}



async function eliminarEstampa(codigoEstampa) {
    const query = 'DELETE FROM Estampas WHERE codigoEstampa = ?'
    const params = [codigoEstampa]
    return db.ejecutarQuery(query, params)
}

module.exports = {
    obtenerTodas,
    obtenerEstampaPorId,
    obtenerEstampasPorArtista,
    obtenerEstampasPorClasificacion,
    crearEstampa,
    modificarEstampa,
    eliminarEstampa
}