const express = require('express')
const modelo = require('../models/estadosEstampasModel')

const router = express.Router()

router.get('/all',modelo.obtenerTodos)
router.get('/:id',modelo.obtenerPorId)

module.exports = router;