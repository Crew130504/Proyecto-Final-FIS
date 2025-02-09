const express = require('express')
const modelo = require('../models/statsModel')

const router = express.Router()

/**
 * @swagger
 * /admin/stats/ev/{limite}:
 *  get:
 *      description: Retorna el codigo de las estampas con sus ventas totales, ordenados de mayor a menor ventas
 *      summary: Obtener las estampas mas vendidass
 *      tags: [Estadisticas]
 *      parameters: [
 *          {
 *              name: limite,
 *              in: path,
 *              description: Limite de estampas (0 para retornas todas),
 *              required: false
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/ev/:limite', modelo.estampasMasVendidas)

/**
 * @swagger
 * /admin/stats/av/{limite}:
 *  get:
 *      description: Retorna el username de los artistas con sus ventas totales, ordenados de mayor a menor ventas
 *      summary: Obtener los artistas con mas ventas
 *      tags: [Estadisticas]
 *      parameters: [
 *          {
 *              name: limite,
 *              in: path,
 *              description: Limite de artistas (0 para retornar todos),
 *              required: false
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/av/:limite', modelo.artistasMasVendidos)

/**
 * @swagger
 * /admin/stats/tr:
 *  get:
 *      description: Retorna el total de dinero recaudado de las ventas
 *      summary: Obtener total recaudado
 *      tags: [Estadisticas]
 *      responses: {
 *          200: {
 *              description: Total retornado,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/tr', modelo.totalRecaudado)

/**
 * @swagger
 * /admin/stats/ra/{cedula}:
 *  get:
 *      description: Retorna el total recaudado por artista
 *      summary: Recaudado por artista
 *      tags: [Estadisticas]
 *      parameters: [
 *          {
 *              name: cedula,
 *              in: path,
 *              description: Cedula del artista (0 para retornar todos),
 *              required: false
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/ra/:cedula', modelo.recaudoArtistas)

/**
 * @swagger
 * /admin/stats/vt:
 *  get:
 *      description: Retorna el total de ventas realizadas
 *      summary: Total de ventas
 *      tags: [Estadisticas]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/vt', modelo.ventasTotales)

/**
 * @swagger
 * /admin/stats/es:
 *  get:
 *      description: Retorna no se que
 *      summary: Estampas stock (?)
 *      tags: [Estadisticas]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/es', modelo.estampasStock)

/**
 * @swagger
 * /admin/stats/ct:
 *  get:
 *      description: Retorna el numero de clientes registrado
 *      summary: Total de clientes
 *      tags: [Estadisticas]
 *      responses: {
 *          200: {
 *              description: Datos retornados,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/ct', modelo.clientesTotales)

module.exports = router;