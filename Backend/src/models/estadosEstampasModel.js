const respuestas = require('../res')
const DAO = require('../DAO/estadosEstampasDAO')

async function obtenerTodos(req, res){
    try {
        const resultado = await DAO.obtenerEstados()
        respuestas.success(req, res, resultado, 200)    
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerPorId(req, res){
    try {
        const resultado = await DAO.obtenerPorId(req.params.id)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    obtenerTodos,
    obtenerPorId
}