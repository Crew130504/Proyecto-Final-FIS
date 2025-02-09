const express = require('express')
const modelo = require('../models/usuariosModel')

const router = express.Router()

router.get('/', modelo.obtenerTodos)

/**
 * @swagger
 * /usuarios/username/{username}:
 *  get:
 *      description: Retorna la cedula del usuario con el username pasado
 *      summary: Obtener cedula por username
 *      tags: [Usuarios]
 *      parameters: [
 *          {
 *              name: username,
 *              in: path,
 *              description: username del usuario,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: usuario encontrado o array vacio si no existe usuario,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/username/:username',modelo.obtenerCedulaPorUsuario)

/**
 * @swagger
 * /usuarios/{cedula}:
 *  get:
 *      description: Retorna toda la informacion del usuario que tiene la cedula enviada
 *      summary: Obtener usuario por cedula
 *      tags: [Usuarios]
 *      parameters: [
 *          {
 *              name: cedula,
 *              in: path,
 *              description: cedula del usuario,
 *              required: true
 *          }
 *      ]
 *      responses: {
 *          200: {
 *              description: usuario encontrado o array vacio si no existe usuario,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.get('/:cedula',modelo.obtenerUsuario)

/**
 * @swagger
 * /usuarios/crearUsuario:
 *  post:
 *      description: Creara y guardara un usuario con los datos pasados
 *      summary: Crear un usuario
 *      tags: [Usuarios]
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
 *                          nombre: {
 *                              description: Nombre del usuario,
 *                              type: string
 *                          },
 *                          username: {
 *                              description: Username del usuario,
 *                              type: string
 *                          },
 *                          contraseña: {
 *                              description: Contraseña del usuario (se encriptara),
 *                              type: string
 *                          },
 *                          direccion: {
 *                              description: Direccion del usuario,
 *                              type: string
 *                          },
 *                          telefono: {
 *                              description: Telefono del usuario,
 *                              type: integer
 *                          },
 *                          idRol: {
 *                              description: Id del rol (cliente, artista o admin) del usuario,
 *                              type: integer
 *                          },
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          201: {
 *              description: usuario creado,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: usuario no se pudo crear,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.post('/crearUsuario', modelo.crearUsuario)

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *      description: Se retorna la informacion del usuario logeado, si todo esta correcto
 *      summary: Loggear usuario
 *      tags: [Usuarios]
 *      requestBody: {
 *          content: {
 *              application/x-www-form-urlencoded: {
 *                  schema: {
 *                      type: object,
 *                      properties: {
 *                          username: {
 *                              description: Username del usuario,
 *                              type: string
 *                          },
 *                          contraseña: {
 *                              description: Contraseña del usuario,
 *                              type: string
 *                          },
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *      responses: {
 *          200: {
 *              description: Loggeo correcto,
 *              content: {application/json: {}} 
 *          },
 *          500: {
 *              description: Usuario no encontrado o contraseña incorrecta,
 *              content: {application/json: {}} 
 *          }
 *      }
 *      
 */
router.post('/login', modelo.login)

router.delete('/borrar/:cedula', modelo.borrarUsuario)

module.exports = router;