const db = require('../DB/mysql')

function obtenerEstados(){
    const query = 'SELECT * FROM EstadosEstampas' 
    return db.ejecutarQuery(query)
}

function obtenerPorId(id){
    const query = 'SELECT * FROM EstadosEstampas WHERE idEstadoEstampa = ?'
    const params = [id]
    return db.ejecutarQuery(query, params)
}

module.exports = {
    obtenerEstados,
    obtenerPorId
}