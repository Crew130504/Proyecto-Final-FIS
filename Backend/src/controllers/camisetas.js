const express = require('express')
const modelo = require('../models/camisetasModel')

const router = express.Router()

/**
 * @swagger
 * /camisetas/{codigo}:
 *  get:
 *      description: Retorna toda la informacion de la camiseta con el codigo pasado
 *      summary: Obtener camiseta por codigo
 *      tags: [Camisetas]
 *      parameters: [
 *          {
 *              name: codigo,
 *              in: path,
 *              description: Codigo de la camiseta,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Camiseta encontrada,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Camiseta no encontrada,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/:codigo',modelo.obtenerCamisetasPorCodigo)

/**
 * @swagger
 * /camisetas/venta/{idVenta}:
 *  get:
 *      description: Retorna todas las camisetas relacionadas con la venta del id pasado
 *      summary: Obtener camisetas por venta
 *      tags: [Camisetas]
 *      parameters: [
 *          {
 *              name: idVenta,
 *              in: path,
 *              description: Id de la venta que se quiere recibir sus camisetas,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Camisetas encontradas,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Venta no encontrada,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/venta/:idVenta',modelo.obtenerCamisetasPorVenta)

/**
 * @swagger
 * /camisetas/crearCamiseta:
 *  post:
 *      description: Creara y guardara una camiseta con los datos pasados
 *      summary: Crear una camiseta
 *      tags: [Camisetas]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          color: {
 *                              description: Color de la camiseta,
 *                              type: string
 *                          },
 *                          precio: {
 *                              description: Precio de la camiseta,
 *                              type: double
 *                          },
 *                          talla: {
 *                              description: Talla de la camiseta,
 *                              type: string
 *                          },
 *                          idVenta: {
 *                              description: Id de la venta relacionada,
 *                              type: integer
 *                          },
 *                          idPosicion: {
 *                              description: Posicion(id) en la que quedo la estampa,
 *                              type: integer
 *                          },
 *                          idMaterial: {
 *                              description: Id del material de la camiseta,
 *                              type: integer
 *                          },
 *                          codigoEstampa: {
 *                              description: Codigo de la estampa de la camiseta,
 *                              type: integer
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          201: {
 *              description: estampa creado,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: estampa no se pudo crear,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.post('/crearCamiseta', modelo.crearCamiseta)

module.exports = router;