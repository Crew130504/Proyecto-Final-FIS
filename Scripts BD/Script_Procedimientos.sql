USE fis;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM Camisetas;
DELETE FROM Ventas;
DELETE FROM Estampas;
DELETE FROM Usuarios;
SET SQL_SAFE_UPDATES = 1;

INSERT INTO Usuarios(cedula, nombre, username, contraseña, direccion, telefono, idRol) VALUES
(1111, "Cliente", "cliente", "pass", "dir", 12345, 1),
(2222, "Artista1", "artista1", "pass", "dir", 12345, 2), -- 1, 9000
(3333, "Artista2", "artista2", "pass", "dir", 12345, 2), -- 2, 14000
(4444, "Artista3", "artista3", "pass", "dir", 12345, 2); -- 3, 11000

INSERT INTO Estampas(codigoEstampa, nombreEstampa, descripcionEstampa, precio, stock, imagen, idClasificacion, idEstadoEstampa, cedula) VALUES
(1, "Estampa1", "Desc est1", 1000, 10, "img", 1, 1, 2222), -- 3
(2, "Estampa2", "Desc est2", 2000, 10, "img", 1, 1, 2222), -- 3
(3, "Estampa3", "Desc est3", 3000, 10, "img", 1, 1, 3333), -- 2
(4, "Estampa4", "Desc est4", 4000, 10, "img", 1, 1, 3333), -- 2
(5, "Estampa5", "Desc est5", 5000, 10, "img", 1, 1, 4444), -- 1
(6, "Estampa6", "Desc est6", 6000, 10, "img", 1, 1, 4444); -- 1

INSERT INTO Ventas(idVenta, fecha, valorTotal, cedula, idEstadoVenta) VALUES
(1, NOW(), 1,1111, 2),
(2, NOW(), 1,1111, 2),
(3, NOW(), 1,1111, 2);

INSERT INTO Camisetas(color, precio, talla, idVenta, idPosicion, idMaterial, codigoEstampa) VALUES
('azul', 1, 's', 1, 1, 1, 1),
('azul', 1, 's', 1, 1, 1, 2),
('azul', 1, 's', 1, 1, 1, 3),
('azul', 1, 's', 1, 1, 1, 4),
('azul', 1, 's', 1, 1, 1, 5),
('azul', 1, 's', 1, 1, 1, 6),
('azul', 1, 's', 2, 1, 1, 1),
('azul', 1, 's', 2, 1, 1, 2),
('azul', 1, 's', 2, 1, 1, 3),
('azul', 1, 's', 2, 1, 1, 4),
('azul', 1, 's', 3, 1, 1, 1),
('azul', 1, 's', 3, 1, 1, 2);


DROP PROCEDURE IF EXISTS ESTAMPAS_MAS_VENDIDAS;
DROP PROCEDURE IF EXISTS ARTISTAS_MAS_VENDIDOS;
DROP PROCEDURE IF EXISTS TOTAL_RECAUDADO;
DROP PROCEDURE IF EXISTS RECAUDO_ARTISTAS;
DROP PROCEDURE IF EXISTS VENTAS_TOTALES;
DROP PROCEDURE IF EXISTS ESTAMPAS_STOCK;
DROP PROCEDURE IF EXISTS CLIENTES_TOTALES;
DROP PROCEDURE IF EXISTS ACTUALIZAR_STOCK;

DELIMITER //

CREATE PROCEDURE ESTAMPAS_MAS_VENDIDAS(IN limite INT)
BEGIN
	IF limite>0 THEN
		SELECT e.nombreEstampa, COUNT(c.codigoCamiseta) AS total
		FROM Camisetas c JOIN Estampas e ON c.codigoEstampa = e.codigoEstampa
		GROUP BY e.codigoEstampa LIMIT limite;
    ELSE
		SELECT e.nombreEstampa, COUNT(c.codigoCamiseta) AS total
		FROM Camisetas c JOIN Estampas e ON c.codigoEstampa = e.codigoEstampa
		GROUP BY e.codigoEstampa;
    END IF;
END;
//

CREATE PROCEDURE ARTISTAS_MAS_VENDIDOS(IN limite INT)
BEGIN
	IF limite>0 THEN
		SELECT a.username, COUNT(c.codigoCamiseta) AS total
		FROM Estampas e
		JOIN Camisetas c ON c.codigoEstampa = e.codigoEstampa
		JOIN Usuarios a ON a.cedula = e.cedula
		GROUP BY a.username LIMIT limite;
	ELSE
		SELECT a.username, COUNT(c.codigoCamiseta) AS total
		FROM Estampas e
		JOIN Camisetas c ON c.codigoEstampa = e.codigoEstampa
		JOIN Usuarios a ON a.cedula = e.cedula
		GROUP BY a.username;
    END IF;
END;

//
CREATE PROCEDURE TOTAL_RECAUDADO()
BEGIN
	SELECT COUNT(valorTotal) AS total FROM VENTAS;
END;

//
CREATE PROCEDURE RECAUDO_ARTISTAS(IN cedula INT)
BEGIN
	IF cedula=0 THEN
		SELECT u.username, SUM(e.precio) AS total
		FROM Camisetas c 
		JOIN Estampas e ON c.codigoEstampa = e.codigoEstampa
		JOIN Usuarios u ON e.cedula = u.cedula
		GROUP BY u.cedula;
	ELSE
		SELECT u.username, SUM(e.precio) AS total
		FROM Camisetas c 
		JOIN Estampas e ON c.codigoEstampa = e.codigoEstampa
		JOIN Usuarios u ON e.cedula = cedula;
    END IF;
END;

//
CREATE PROCEDURE VENTAS_TOTALES()
BEGIN
	SELECT COUNT(idVenta) AS total FROM ventas;
END;

//
CREATE PROCEDURE ESTAMPAS_STOCK()
BEGIN
	SELECT 1;
	/*
    ¿ACA QUE?
    */
END;

//
CREATE PROCEDURE CLIENTES_TOTALES()
BEGIN
	SELECT 
		SUM(CASE WHEN idRol = 1 THEN 1 ELSE 0 END) AS total
	FROM usuarios;
END;
//

CREATE PROCEDURE ACTUALIZAR_STOCK(IN estampa INT)
BEGIN
	DECLARE stockInicial INT;
    SELECT e.stock INTO stockInicial FROM estampas e WHERE e.codigoEstampa = estampa;
	UPDATE estampas SET stock = stockInicial-1 WHERE codigoEstampa = estampa;
END;
//

DELIMITER ;