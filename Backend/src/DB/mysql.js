const mysql = require('mysql2/promise')
const config = require('../config')

const dbconfig = config.mysql

let conexion

async function conexionDB(){
    console.log('conectando a DB')
    try {
        conexion = await mysql.createConnection(dbconfig)
        console.log('Conexion a DB exitosa')
        conexion.on('error', err => {
            console.log(err)
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                conexionDB()
            }else{
                throw err
            }
        })
    } catch (error) {
        console.log('Error al conectar a la BD: '+error.message)
    }
}

async function ejecutarQuery(query, params = []){
    try {
        const [results] = await conexion.query(query, params)
        return results
    } catch (error) {
        throw error
    }
}

async function cerrarConexion(){
    await conexion.end()
}

module.exports = {conexionDB, ejecutarQuery, cerrarConexion}