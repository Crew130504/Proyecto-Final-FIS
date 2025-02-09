const respuestas = require('../res')
const DAO = require('../DAO/statsDAO')

async function estampasMasVendidas(req, res){
    try {
        const resultado = await DAO.estampasMasVendidas(req.params.limite)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function artistasMasVendidos(req, res){
    try {
        const resultado = await DAO.artistasMasVendidos(req.params.limite)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function totalRecaudado(req, res) {
    try {
        const resultado = await DAO.totalRecaudado()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function recaudoArtistas(req, res) {
    try {
        const resultado = await DAO.recaudoArtistas(req.params.cedula)
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function ventasTotales(req, res) {
    try {
        const resultado = await DAO.ventasTotales()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function estampasStock(req, res) {
    try {
        const resultado = await DAO.estampasStock()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

async function clientesTotales(req, res) {
    try {
        const resultado = await DAO.clientesTotales()
        respuestas.success(req, res, resultado, 200)
    } catch (error) {
        respuestas.error(req, res, error.message, 500)
    }
}

module.exports = {
    estampasMasVendidas,
    artistasMasVendidos,
    totalRecaudado,
    recaudoArtistas,
    ventasTotales,
    estampasStock,
    clientesTotales
}