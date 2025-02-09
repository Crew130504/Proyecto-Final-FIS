const respuestas = require('../res');
const DAO = require('../DAO/ventasDAO');

class Venta {
    constructor(cedula, totalCompra, detalles, estadoCompra = 'Pendiente') {
        this.cedula = cedula;
        this.totalCompra = totalCompra;
        this.detalles = detalles;
        this.estadoCompra = estadoCompra;
    }

    validarVenta() {
        if (!this.cedula || typeof this.cedula !== 'number') {
            throw new Error('La cédula es obligatoria y debe ser un número.');
        }

        if (!this.totalCompra || typeof this.totalCompra !== 'number' || this.totalCompra <= 0) {
            throw new Error('El total de la compra debe ser un número mayor a 0.');
        }

        if (!Array.isArray(this.detalles) || this.detalles.length === 0) {
            throw new Error('Debe incluir al menos un detalle en la venta.');
        }

        this.detalles.forEach(detalle => {
            if (!detalle.codigoEstampa || typeof detalle.codigoEstampa !== 'number') {
                throw new Error('Cada detalle debe incluir un código de estampa válido.');
            }

            if (!detalle.cantidad || typeof detalle.cantidad !== 'number' || detalle.cantidad <= 0) {
                throw new Error('La cantidad debe ser un número mayor a 0.');
            }

            if (!detalle.precioUnitario || typeof detalle.precioUnitario !== 'number' || detalle.precioUnitario <= 0) {
                throw new Error('El precio unitario debe ser un número mayor a 0.');
            }

            // Validación de personalización
            const { color, talla, material, ubicacion, tamañoEstampa, diseño } = detalle;

            if (!color || typeof color !== 'string') throw new Error('El color es obligatorio.');
            if (!talla || typeof talla !== 'string') throw new Error('La talla es obligatoria.');
            if (!material || typeof material !== 'string') throw new Error('El material es obligatorio.');
            if (!ubicacion || typeof ubicacion !== 'string') throw new Error('La ubicación de la estampa es obligatoria.');
            if (!tamañoEstampa || typeof tamañoEstampa !== 'string') throw new Error('El tamaño de la estampa es obligatorio.');
            if (!diseño || typeof diseño !== 'string') throw new Error('El diseño es obligatorio.');
        });
    }
}


// Función para obtener venta por ID
async function obtenerVentaPorId(req, res) {
    try {
        const resultado = await DAO.obtenerVentaPorId(req.params.idVenta);
        respuestas.success(req, res, resultado, 200);
    } catch (error) {
        respuestas.error(req, res, error.message, 500);
    }
}

// Función para obtener ventas por usuario
async function obtenerVentasPorUsuario(req, res) {
    try {
        const resultado = await DAO.obtenerVentasPorUsuario(req.params.cedula);
        respuestas.success(req, res, resultado, 200);
    } catch (error) {
        respuestas.error(req, res, error.message, 500);
    }
}


// Función para crear una venta con validación
async function crearVenta(req, res) {
    try {
        const { cedula, totalCompra, detalles } = req.body;

        // Crear una nueva instancia de Venta y validar
        const nuevaVenta = new Venta(cedula, totalCompra, detalles);
        nuevaVenta.validarVenta();

        // Enviar la venta validada al DAO
        const resultado = await DAO.crearVenta(req.body);
        respuestas.success(req, res, resultado, 201);
    } catch (error) {
        respuestas.error(req, res, error.message, 500);
    }
}

module.exports = {
    obtenerVentaPorId,
    obtenerVentasPorUsuario,
    crearVenta
};
