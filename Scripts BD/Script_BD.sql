CREATE DATABASE IF NOT EXISTS fis;
USE fis;

DROP TABLE IF EXISTS Camisetas;
DROP TABLE IF EXISTS Estampas;
DROP TABLE IF EXISTS Materiales;
DROP TABLE IF EXISTS Posiciones;
DROP TABLE IF EXISTS Ventas;
DROP TABLE IF EXISTS EstadosEstampas;
DROP TABLE IF EXISTS Clasificaciones;
DROP TABLE IF EXISTS EstadosVentas;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(30)
);

CREATE TABLE Usuarios (
    cedula BIGINT PRIMARY KEY,
    nombre VARCHAR(50),
    username VARCHAR(15) UNIQUE,
    contraseña VARCHAR(100),
    direccion VARCHAR(50),
    telefono BIGINT,
    idRol INT,
    FOREIGN KEY (idRol) REFERENCES Roles(idRol)
);

CREATE TABLE EstadosVentas (
    idEstadoVenta INT AUTO_INCREMENT PRIMARY KEY,
    nombreEstadoVenta VARCHAR(30)
);

CREATE TABLE Clasificaciones (
    idClasificacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20),
    descripcion VARCHAR(50)
);

CREATE TABLE EstadosEstampas (
    idEstadoEstampa INT AUTO_INCREMENT PRIMARY KEY,
    referenciaEstadoEstampa VARCHAR(30)
);

CREATE TABLE Ventas (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    valorTotal DECIMAL(10, 2),
    cedula BIGINT,
    idEstadoVenta INT,
    FOREIGN KEY (cedula) REFERENCES Usuarios(cedula),
    FOREIGN KEY (idEstadoVenta) REFERENCES EstadosVentas(idEstadoVenta)
);

CREATE TABLE Posiciones (
    idPosicion INT AUTO_INCREMENT PRIMARY KEY,
    referenciaPosicion VARCHAR(30)
);

CREATE TABLE Materiales (
    idMaterial INT AUTO_INCREMENT PRIMARY KEY,
    nombreMaterial VARCHAR(30)
);

CREATE TABLE Estampas (
    codigoEstampa INT AUTO_INCREMENT PRIMARY KEY,
    nombreEstampa VARCHAR(30),
    descripcionEstampa VARCHAR(50),
    precio DECIMAL(10, 2),
    stock INT,
    imagen VARCHAR(200),
    idClasificacion INT,
    idEstadoEstampa INT,
    cedula BIGINT,
    FOREIGN KEY (idClasificacion) REFERENCES Clasificaciones(idClasificacion),
    FOREIGN KEY (idEstadoEstampa) REFERENCES EstadosEstampas(idEstadoEstampa),
    FOREIGN KEY (cedula) REFERENCES Usuarios(cedula)
);

CREATE TABLE Camisetas (
    codigoCamiseta INT AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(10),
    precio DECIMAL(10, 2),
    talla VARCHAR(3),
    idVenta INT,
    idPosicion INT,
    idMaterial INT,
    codigoEstampa INT,
    FOREIGN KEY (idVenta) REFERENCES Ventas(idVenta),
    FOREIGN KEY (idPosicion) REFERENCES Posiciones(idPosicion),
    FOREIGN KEY (idMaterial) REFERENCES Materiales(idMaterial),
    FOREIGN KEY (codigoEstampa) REFERENCES Estampas(codigoEstampa)
);