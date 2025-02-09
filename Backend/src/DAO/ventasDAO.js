const db = require('../DB/mysql');

// Obtener todas las ventas
async function obtenerVentas() {
    const query = 'SELECT * FROM Ventas';
    return db.ejecutarQuery(query);
}

// Obtener detalles de una venta específica
async function obtenerDetallesVenta(idVenta) {
    const queryVenta = 'SELECT * FROM Ventas WHERE idVenta = ?';
    const queryDetalles = 'SELECT * FROM detallesVentas WHERE idVenta = ?';

    const venta = await db.ejecutarQuery(queryVenta, [idVenta]);
    const detalles = await db.ejecutarQuery(queryDetalles, [idVenta]);

    return { venta, detalles };
}

// Crear una nueva venta
async function crearVenta(req, res) {
    try {
        // Asegurarse de que el cuerpo de la solicitud se está leyendo correctamente
        const { cedula, totalCompra, detalles } = req.body;
        
        if (!cedula || !totalCompra) {
            throw new Error('La cédula y el total de la compra son obligatorios.');
        }

        // Insertar la venta en la tabla Ventas
        const queryVenta = 'INSERT INTO Ventas (fechaCompra, cedula, totalCompra) VALUES (NOW(), ?, ?)';
        const paramsVenta = [cedula, totalCompra];
        const result = await db.ejecutarQuery(queryVenta, paramsVenta);


        if (!result.insertId) {
            throw new Error('No se pudo registrar la venta.');
        }

        const idVenta = result.insertId;

        // Insertar detalles de la venta
        for (const detalle of detalles) {
            const queryDetalle = `
                INSERT INTO detallesVentas 
                (idVenta, codigoEstampa, cantidad, precioUnitario, color, talla, material, ubicacionEstampa, tamañoEstampa, diseño, descripcionPersonalizada)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const paramsDetalle = [
                idVenta,
                detalle.codigoEstampa,
                detalle.cantidad,
                detalle.precioUnitario,
                detalle.color,
                detalle.talla,
                detalle.material,
                detalle.ubicacion,
                detalle.tamañoEstampa,
                detalle.diseño,
                detalle.descripcionPersonalizada
            ];

            await db.ejecutarQuery(queryDetalle, paramsDetalle);
        }

        // Respuesta exitosa
        res.status(201).json({ idVenta, mensaje: 'Venta registrada exitosamente' });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: error.message });
    }
}

// Eliminar una venta y sus detalles
async function eliminarVenta(idVenta) {
    const queryDetalles = 'DELETE FROM detallesVentas WHERE idVenta = ?';
    const queryVenta = 'DELETE FROM Ventas WHERE idVenta = ?';

    await db.ejecutarQuery(queryDetalles, [idVenta]);
    await db.ejecutarQuery(queryVenta, [idVenta]);

    return { mensaje: 'Venta eliminada exitosamente' };
}

module.exports = {
    obtenerVentas,
    obtenerDetallesVenta,
    crearVenta,
    eliminarVenta
};
