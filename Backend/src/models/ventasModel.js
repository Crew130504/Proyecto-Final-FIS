const respuestas = require('../res')
const DAO = require('../DAO/ventasDAO')

async function obtenerVentaPorId(req, res){
    try {
        const resultado = await DAO.obtenerVentaPorId(req.params.idVenta)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerVentasPorUsuario(req, res){
    try {
        const resultado = await DAO.obtenerVentasPorUsuario(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerVentasUsuarioPorEstado(req, res){
    try {
        const resultado = await DAO.obtenerVentasUsuarioPorEstado(req.body.cedula, req.body.estado)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function crearVenta(req, res){
    try {
        const resultado = await DAO.crearVenta(req.body)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    obtenerVentaPorId,
    obtenerVentasPorUsuario,
    obtenerVentasUsuarioPorEstado,
    crearVenta
}