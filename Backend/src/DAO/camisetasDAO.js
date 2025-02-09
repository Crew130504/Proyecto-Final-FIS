const db = require('../DB/mysql')

async function obtenerCamisetasPorVenta(idVenta){
    const query = 'SELECT * FROM Camisetas WHERE idVenta = ?'
    const params = [idVenta]
    return db.ejecutarQuery(query, params)
}

async function obtenerCamisetasPorCodigo(codigoCamiseta){
    const query = 'SELECT * FROM Camisetas WHERE codigoCamiseta = ?'
    const params = [codigoCamiseta]
    return db.ejecutarQuery(query, params)
}

function crearCamiseta(camiseta){
    const query = 'INSERT INTO Camisetas(color, precio, talla, idVenta, idPosicion, idMaterial, codigoEstampa) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const params = [camiseta.color, camiseta.precio, camiseta.talla, camiseta.idVenta, camiseta.idPosicion, camiseta.idMaterial, camiseta.codigoEstampa]
    db.ejecutarQuery('CALL ACTUALIZAR_STOCK(?)', [camiseta.codigoEstampa])
    return db.ejecutarQuery(query, params)
}

module.exports = {
    obtenerCamisetasPorVenta,
    obtenerCamisetasPorCodigo,
    crearCamiseta
}