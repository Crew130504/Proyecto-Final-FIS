const respuestas = require('../res')
const bcrypt = require('bcrypt')
const DAO = require('../DAO/usuariosDAO')
const saltRounds = 5;

async function obtenerTodos(req, res){
    try {
        const resultado = await DAO.obtenerTodos()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerCedulaPorUsuario(req, res){
    try {
        const resultado = await DAO.obtenerCedulaPorUsuario(req.params.username)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerUsuario(req, res){
    try {
        const resultado = await DAO.obtenerUsuario(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function crearUsuario(req, res){
    usuario = req.body
    usuario.contraseña = await bcrypt.hash(req.body.contraseña, saltRounds)
    try {
        const resultado = await DAO.crearUsuario(usuario)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function login(req, res){
    try {
        const usuario = await DAO.obtenerUsuarioPorUsername(req.body.username)
        if(!usuario[0]){
            respuestas.error(req, res, "Usuario no encontrado", 500)
        }else{
            bcrypt.compare(req.body.contraseña, usuario[0].contraseña)
            .then((resultado) => {
                if(resultado){
                    respuestas.success(req, res, {'RolId': usuario[0].idRol}, 200)
                }else{
                    respuestas.error(req, res, "Contraseña incorrecta", 500)
                }
            })
        }
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function borrarUsuario(req, res){
    try {
        const resultado = await DAO.borrarUsuario(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    obtenerTodos,
    obtenerCedulaPorUsuario,
    obtenerUsuario,
    crearUsuario,
    login,
    borrarUsuario
}