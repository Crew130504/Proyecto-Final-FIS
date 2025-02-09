const db = require('../DB/mysql')

async function estampasMasVendidas(total = 0){
    const query = 'CALL ESTAMPAS_MAS_VENDIDAS(?)'
    const params = [total]
    return db.ejecutarQuery(query, params)
}

async function artistasMasVendidos(total = 0){
    const query = 'CALL ARTISTAS_MAS_VENDIDOS(?)'
    const params = [total]
    return db.ejecutarQuery(query, params)
}

async function totalRecaudado() {
    const query = 'CALL TOTAL_RECAUDADO()'
    return db.ejecutarQuery(query)
}

async function recaudoArtistas(cedula = 0) {
    const query = 'CALL RECAUDO_ARTISTAS(?)'
    const params = [cedula]
    return db.ejecutarQuery(query, params)
}

async function ventasTotales() {
    const query = 'CALL VENTAS_TOTALES()'
    return db.ejecutarQuery(query)
}

async function estampasStock() {
    const query = 'CALL ESTAMPAS_STOCK()'
    return db.ejecutarQuery(query)
}

async function clientesTotales() {
    const query = 'CALL CLIENTES_TOTALES()'
    return db.ejecutarQuery(query)
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