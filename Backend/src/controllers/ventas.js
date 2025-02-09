const express = require('express');
const router = express.Router();
const ventasDAO = require('../DAO/ventasDAO');  // Asegúrate de que aquí se importa el DAO correcto

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Endpoints para la gestión de ventas
 */

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cedula
 *               - totalCompra
 *               - detalles
 *             properties:
 *               cedula:
 *                 type: integer
 *                 description: Cédula del cliente que realiza la compra
 *               totalCompra:
 *                 type: number
 *                 description: Total de la compra
 *               detalles:
 *                 type: array
 *                 description: Lista de productos comprados con personalización
 *                 items:
 *                   type: object
 *                   properties:
 *                     codigoEstampa:
 *                       type: integer
 *                       description: Código de la estampa comprada
 *                     cantidad:
 *                       type: integer
 *                       description: Cantidad comprada
 *                     precioUnitario:
 *                       type: number
 *                       description: Precio unitario del producto
 *                     color:
 *                       type: string
 *                       description: Color de la camiseta
 *                     talla:
 *                       type: string
 *                       description: Talla de la camiseta
 *                     material:
 *                       type: string
 *                       description: Material de la camiseta
 *                     ubicacion:
 *                       type: string
 *                       description: Ubicación de la estampa
 *                     tamañoEstampa:
 *                       type: string
 *                       description: Tamaño de la estampa
 *                     diseño:
 *                       type: string
 *                       description: Diseño elegido
 *                     descripcionPersonalizada:
 *                       type: string
 *                       description: Descripción personalizada si aplica
 *     responses:
 *       201:
 *         description: Venta registrada exitosamente
 *       500:
 *         description: Error al registrar la venta
 */

router.post('/', ventasDAO.crearVenta);

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de todas las ventas registradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idVenta:
 *                     type: integer
 *                   cedula:
 *                     type: integer
 *                   totalCompra:
 *                     type: number
 *                   fechaVenta:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener las ventas
 */
router.get('/', ventasDAO.obtenerVentas);

/**
 * @swagger
 * /ventas/{idVenta}:
 *   get:
 *     summary: Obtener los detalles de una venta específica
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: idVenta
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta que se desea consultar
 *     responses:
 *       200:
 *         description: Detalles de la venta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 venta:
 *                   type: object
 *                   properties:
 *                     idVenta:
 *                       type: integer
 *                     cedula:
 *                       type: integer
 *                     totalCompra:
 *                       type: number
 *                     fechaVenta:
 *                       type: string
 *                       format: date-time
 *                 detalles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigoEstampa:
 *                         type: integer
 *                       cantidad:
 *                         type: integer
 *                       precioUnitario:
 *                         type: number
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error al obtener los detalles de la venta
 */
router.get('/:idVenta', ventasDAO.obtenerDetallesVenta);


/**
 * @swagger
 * /ventas/{idVenta}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: idVenta
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error al eliminar la venta
 */
router.delete('/:idVenta', ventasDAO.eliminarVenta);

module.exports = router;
