const db = require('../DB/mysql')

async function obtenerTodos(){
    const query = 'SELECT * FROM Usuarios'
    return db.ejecutarQuery(query)
}

async function obtenerCedulaPorUsuario(username) {
    const query = 'SELECT cedula FROM Usuarios WHERE username = ?'
    const params = [username]
    return db.ejecutarQuery(query, params)
}

async function obtenerUsuario(cedula){
    const query = 'SELECT * FROM Usuarios WHERE cedula = ?'
    const params = [cedula]
    return db.ejecutarQuery(query, params)
}

async function obtenerUsuarioPorUsername(username){
    const query = 'SELECT * FROM Usuarios WHERE username = ?'
    const params = [username]
    return db.ejecutarQuery(query, params)
}

async function crearUsuario(usuario){
    const query = 'INSERT INTO Usuarios(cedula, nombre, username, contraseña, direccion, telefono, idRol) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const params = [usuario.cedula, usuario.nombre, usuario.username, usuario.contraseña, usuario.direccion, usuario.telefono, usuario.idRol]
    return db.ejecutarQuery(query, params)
}

async function borrarUsuario(cedula){
    const query = 'DELETE FROM Usuarios WHERE cedula = ?'
    const params = [cedula]
    return db.ejecutarQuery(query, params)
}

module.exports = {
    obtenerTodos,
    obtenerCedulaPorUsuario,
    obtenerUsuario,
    obtenerUsuarioPorUsername,
    crearUsuario,
    borrarUsuario
}