const respuestas = require('../res')
const DAO = require('../DAO/camisetasDAO')

async function obtenerCamisetasPorVenta(req, res){
    try {
        const resultado = await DAO.obtenerCamisetasPorVenta(req.params.idVenta)
        respuestas.success(req, res, resultado, 200)     
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerCamisetasPorCodigo(req, res){
    try {
        const resultado = await DAO.obtenerCamisetasPorCodigo(req.params.codigo)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function crearCamiseta(req, res){
    try {
        const resultado = DAO.crearCamiseta(req.body)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    obtenerCamisetasPorVenta,
    obtenerCamisetasPorCodigo,
    crearCamiseta
}