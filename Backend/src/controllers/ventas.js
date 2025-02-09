const express = require('express')
const modelo = require('../models/ventasModel')
const { route } = require('./estadosEstampas')

const router = express.Router()

/**
 * @swagger
 * /ventas/{idVenta}:
 *  get:
 *      description: Retorna toda la informacion de la venta con id pasado
 *      summary: Obtener ventas por id
 *      tags: [Ventas]
 *      parameters: [
 *          {
 *              name: idVenta,
 *              in: path,
 *              description: Id de la venta,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Venta encontrada,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Venta no encontrada,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/:idVenta', modelo.obtenerVentaPorId)

/**
 * @swagger
 * /ventas/usuario/{cedula}:
 *  get:
 *      description: Retorna todas las ventas del usuario con la cedula pasada
 *      summary: Obtener ventas por usuario
 *      tags: [Ventas]
 *      parameters: [
 *          {
 *              name: cedula,
 *              in: path,
 *              description: Cedula del usuario,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Ventas encontradas, vacio si aun no hay ventas para ese usuario,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Usuario no existe o no encontrado,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/usuario/:cedula',modelo.obtenerVentasPorUsuario)

/**
 * @swagger
 * /ventas/usuario/estado:
 *  get:
 *      description: Retorna todas las ventas del usuario con la cedula pasada, y con el estado del id pasado
 *      summary: Obtener ventas usuario y id de estado de venta
 *      tags: [Ventas]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          cedula: {
 *                              description: Cedula del usuario,
 *                              type: integer
 *                          },
 *                          estado: {
 *                              description: ID del estado de venta,
 *                              type: string
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          200: {
 *              description: Ventas encontradas, o vacio si no hay,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Usuario o id de estado no encontrado,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/usuario/estado', modelo.obtenerVentasUsuarioPorEstado)

/**
 * @swagger
 * /ventas/crearVenta:
 *  post:
 *      description: Creara y guardara una venta con los datos pasados
 *      summary: Crear una venta
 *      tags: [Ventas]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          fecha: {
 *                              description: Fecha en la que se hizo la venta,
 *                              type: date
 *                          },
 *                          valorTotal: {
 *                              description: Total de la venta,
 *                              type: double
 *                          },
 *                          cedula: {
 *                              description: Cedula del usuario que realizo la venta,
 *                              type: integer
 *                          },
 *                          idEstadoVenta: {
 *                              description: Id del estado inicial de la venta,
 *                              type: integer
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          201: {
 *              description: venta creado,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: venta no se pudo crear,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.post('/crearVenta', modelo.crearVenta)

module.exports = router;