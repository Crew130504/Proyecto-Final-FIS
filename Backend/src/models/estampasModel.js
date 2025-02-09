const respuestas = require('../res')
const fs = require('fs')
const DAO = require('../DAO/estampasDAO')

async function obtenerTodas(req, res){
    try {
        const resultado = await DAO.obtenerTodas()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampaPorId(req, res){
    try {
        const resultado = await DAO.obtenerEstampaPorId(req.params.codigoEstampa)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampasPorArtista(req, res){
    try {
        const resultado = await DAO.obtenerEstampasPorArtista(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampasPorClasificacion(req, res){
    try {
        const resultado = await DAO.obtenerEstampasPorClasificacion(req.params.idClasificacion)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function crearEstampa(req, res){
    const pathBase = `${req.protocol}://${req.get('host')}/src/public/imagenes-estampas/`
    const nombreArchivo = req.file.filename
    req.body.imagen = pathBase+nombreArchivo
    console.log(req.body.imagen)
    try {
        const resultado = await DAO.crearEstampa(req.body)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function modificarEstampa(req, res){
    //Eliminar anterior imagen
    const oldPath = req.body.imagen
    fs.unlink(oldPath, (err) => {
        if (err) {
            console.error('Error al eliminar la imagen:', err);
            return respuestas.error(req, res, 'Error al eliminar la imagen', 500)
        }
    });

    const pathBase = `${req.protocol}://${req.get('host')}/src/public/imagenes-estampas/`
    const nombreArchivo = req.file.filename
    req.body.imagen = pathBase+nombreArchivo
    try {
        const resultado = await DAO.modificarEstampa(req.body)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function eliminarEstampaPorId(req, res){
    try {
        const resultado = await DAO.eliminarEstampa(req.params.codigoEstampa)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    obtenerTodas,
    obtenerEstampaPorId,
    obtenerEstampasPorArtista,
    obtenerEstampasPorClasificacion,
    crearEstampa,
    modificarEstampa,
    eliminarEstampaPorId
}