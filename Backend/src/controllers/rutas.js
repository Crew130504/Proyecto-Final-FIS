const express = require('express')

// Controladores
const usuarios = require('./usuarios')
const estampas = require('./estampas')
const ventas = require('./ventas')
const stats = require('./stats')

// Rutas
const routerAPI = express.Router()
routerAPI.use('/usuarios', usuarios)
routerAPI.use('/estampas', estampas)
routerAPI.use('/ventas', ventas)
routerAPI.use('/admin/stats', stats)

module.exports = routerAPI