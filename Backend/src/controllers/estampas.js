const express = require('express')
const multer = require('multer')
const modelo = require('../models/estampasModel')
const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/imagenes-estampas/')
    },
    filename: function (req, file, cb) {
        const extension = FILE_TYPE_MAP[file.mimetype]
        const nombreArchivo = file.originalname.replace(/\s+/g, '').replace(/\./g, '').replace(extension, '')
        cb(null, nombreArchivo + '-' + Date.now() + '.' + extension)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

/**
 * @swagger
 * /estampas/:
 *  get:
 *      description: Retorna todas las estampas con su informacion
 *      summary: Obtener estampas
 *      tags: [Estampas]
 *      responses: {
 *          200: {
 *              description: Estampas retornadas,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Error interno,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/', modelo.obtenerTodas)

/**
 * @swagger
 * /estampas/{codigoEstampa}:
 *  get:
 *      description: Retorna toda la informacion de la estampa con el codigo pasado
 *      summary: Obtener estampa por codigo
 *      tags: [Estampas]
 *      parameters: [
 *          {
 *              name: codigoEstampa,
 *              in: path,
 *              description: Codigo de la estampa,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Estampa encontrada,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Estampa no encontrada,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/:codigoEstampa', modelo.obtenerEstampaPorId)

/**
 * @swagger
 * /estampas/artista/{cedula}:
 *  get:
 *      description: Retorna todas las estampas relacionadas al artista con la cedula pasada
 *      summary: Obtener estampas por artista
 *      tags: [Estampas]
 *      parameters: [
 *          {
 *              name: cedula,
 *              in: path,
 *              description: Cedula del artista,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Estampas encontradas, o vacio si aun no ha subido,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: El artista no fue encontrado,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/artista/:cedula', modelo.obtenerEstampasPorArtista)

/**
 * @swagger
 * /estampas/clasificacion/{idClasificacion}:
 *  get:
 *      description: Retorna todas las estampas de la clasificacion pasada
 *      summary: Obtener estampas por clasificacion
 *      tags: [Estampas]
 *      parameters: [
 *          {
 *              name: idClasificacion,
 *              in: path,
 *              description: Id de la clasificacion para clasificar,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Estampas encontradas, o vacio si aun no hay estampas con esa clasificacion,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Clasificacion con es id no existe,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/clasificacion/:idClasificacion', modelo.obtenerEstampasPorClasificacion)

/**
 * @swagger
 * /estampas/crearEstampa:
 *  post:
 *      description: Creara y guardara una estampa con los datos pasados
 *      summary: Crear una estampa
 *      tags: [Estampas]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          nombreEstampa: {
 *                              description: Nombre de la estampa,
 *                              type: string
 *                          },
 *                          descripcionEstampa: {
 *                              description: Descripcion de la estampa,
 *                              type: string
 *                          },
 *                          precio: {
 *                              description: Precio de la estampa,
 *                              type: integer
 *                          },
 *                          stock: {
 *                              description: Stock incial de la estampa,
 *                              type: integer
 *                          },
 *                          imagen: {
 *                              description: ARCHIVO DE LA ESTAMPA,
 *                              type: file
 *                          },
 *                          cedula: {
 *                              description: Cedula del artista,
 *                              type: integer
 *                          },
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
router.post('/crearEstampa', upload.single('imagen'), modelo.crearEstampa)

/**
 * @swagger
 * /estampas/modificarEstampa:
 *  put:
 *      description: Modificar una estampa ajustando los datos de esta con los datos pasados
 *      summary: Modificar una estampa
 *      tags: [Estampas]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          nombreEstampa: {
 *                              description: Nombre de la estampa,
 *                              type: string
 *                          },
 *                          descripcionEstampa: {
 *                              description: Descripcion de la estampa,
 *                              type: string
 *                          },
 *                          precio: {
 *                              description: Precio de la estampa,
 *                              type: integer
 *                          },
 *                          stock: {
 *                              description: Stock incial de la estampa,
 *                              type: integer
 *                          },
 *                          imagen: {
 *                              description: ARCHIVO DE LA ESTAMPA,
 *                              type: file
 *                          },
 *                          cedula: {
 *                              description: Cedula del artista,
 *                              type: integer
 *                          },
 *                          codigoEstampa: {
 *                              description: Codigo de la estampa a modificar,
 *                              type: integer
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          201: {
 *              description: estampa modificada,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: estampa no se pudo modificar,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.put('/modificarEstampa', modelo.modificarEstampa);

/**
 * @swagger
 * /estampas/{codigoEstampa}:
 *  delete:
 *      description: Elimina la estampa con el codigo pasado
 *      summary: Eliminar estampa
 *      tags: [Estampas]
 *      parameters: [
 *          {
 *              name: codigoEstampa,
 *              in: path,
 *              description: Codigo de la estampa,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: Estampa eliminada,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Error interno (?,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.delete('/:codigoEstampa', modelo.eliminarEstampaPorId)

module.exports = router;