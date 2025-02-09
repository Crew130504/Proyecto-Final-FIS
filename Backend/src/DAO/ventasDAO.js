const db = require('../DB/mysql')

async function obtenerVentaPorId(id){
    const query = 'SELECT * FROM Ventas WHERE idVenta = ?'
    const params = [id]
    return db.ejecutarQuery(query, params)
}

async function obtenerVentasPorUsuario(cedula){
    const query = 'SELECT * FROM Ventas WHERE cedula = ?'
    const params = [cedula] 
    return db.ejecutarQuery(query, params)
}

async function obtenerVentasUsuarioPorEstado(cedula, estado){
    const query = 'SELECT * FROM Ventas WHERE cedula = ? AND idEstadoVenta = ?'
    const params = [cedula, estado]
    return db.ejecutarQuery(query, params)
}

function crearVenta(venta){
    const query = 'INSERT INTO Ventas(fecha, valorTotal, cedula, idEstadoVenta) VALUES(?, ?, ?, ?)'
    const params = [venta.fecha, venta.valorTotal, venta.cedula, venta.idEstadoVenta]
    return db.ejecutarQuery(query, params)
}

module.exports = {
    obtenerVentaPorId,
    obtenerVentasPorUsuario,
    obtenerVentasUsuarioPorEstado,
    crearVenta
}