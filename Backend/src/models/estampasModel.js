const respuestas = require('../res')
const fs = require('fs')
const DAO = require('../DAO/estampasDAO')

async function obtenerTodas(req, res) {
    try {
        const resultado = await DAO.obtenerTodas()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampaPorId(req, res) {
    try {
        const resultado = await DAO.obtenerEstampaPorId(req.params.codigoEstampa)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampasPorArtista(req, res) {
    try {
        const resultado = await DAO.obtenerEstampasPorArtista(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function obtenerEstampasPorClasificacion(req, res) {
    try {
        const resultado = await DAO.obtenerEstampasPorClasificacion(req.params.idClasificacion)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function crearEstampa(req, res) {
    const pathBase = `${req.protocol}://${req.get('host')}/src/public/imagenes-estampas/`
    const nombreArchivo = req.file.filename
    req.body.imagen = pathBase + nombreArchivo
    console.log(req.body.imagen)
    try {
        const resultado = await DAO.crearEstampa(req.body)
        respuestas.success(req, res, resultado, 201)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function modificarEstampa(req, res) {
    console.log('Datos recibidos para modificar:', req.body);

    try {
        const { codigoEstampa, stock } = req.body;

        // Imprimir valores recibidos para depuración
        console.log(`Código de Estampa recibido: ${codigoEstampa} (tipo: ${typeof codigoEstampa})`);
        console.log(`Stock recibido: ${stock} (tipo: ${typeof stock})`);

        // Validación más robusta para evitar falsos positivos
        if (codigoEstampa === undefined || codigoEstampa === null) {
            console.log('Error: El código de la estampa es nulo o indefinido');
            return respuestas.error(req, res, 'Faltan datos para modificar la estampa', 400);
        }

        if (stock === undefined || stock === null) {
            console.log('Error: El stock es nulo o indefinido');
            return respuestas.error(req, res, 'Faltan datos para modificar la estampa', 400);
        }

        // Llama a la función DAO para modificar solo el stock
        const resultado = await DAO.modificarEstampa({ codigoEstampa, stock });

        respuestas.success(req, res, resultado, 200);  // Asegúrate de devolver un código 200 al éxito
    } catch (error) {
        console.error('Error al modificar la estampa:', error);
        respuestas.error(req, res, error.message, 500);
    }
}





async function eliminarEstampaPorId(req, res) {
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