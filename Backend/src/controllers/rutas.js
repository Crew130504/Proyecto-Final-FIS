const express = require('express')

// Controladores
const estadosEstampas = require('./estadosEstampas')
const usuarios = require('./usuarios')
const estampas = require('./estampas')
const camisetas = require('./camisetas')
const ventas = require('./ventas')
const stats = require('./stats')

// Rutas
const routerAPI = express.Router()
routerAPI.use('/estadosEstampas', estadosEstampas)
routerAPI.use('/usuarios', usuarios)
routerAPI.use('/estampas', estampas)
routerAPI.use('/camisetas', camisetas)
routerAPI.use('/ventas', ventas)
routerAPI.use('/admin/stats', stats)

module.exports = routerAPI