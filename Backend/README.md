# Proyecto Backend: Gestión de Estampas y Pedidos

Este repositorio contiene la lógica de negocio y los servicios del lado del servidor necesarios para la plataforma de venta de camisetas personalizables.

---

## Descripción General

El backend es responsable de manejar las solicitudes del frontend, gestionar la base de datos, realizar la autenticación de usuarios y aplicar las reglas de negocio relacionadas con la personalización y compra de camisetas. Está diseñado para ser robusto, seguro y escalable.

---

## Requisitos Previos

- **Node.js**: Se requiere una versión reciente de Node.js junto con npm para manejar las dependencias.
- **MySQL**: Es necesario tener una instancia de MySQL configurada y en ejecución.
- **Editor de Código**: Visual Studio Code u otro editor de texto compatible para modificar y ejecutar el código fuente.

---

## Instalación

1. Clona este repositorio en tu máquina local.

2. Navega a la carpeta raíz del backend.

3. Instala las dependencias necesarias con:

   ```bash
   npm install
   ```

---

## Configuración

1. Crea un archivo `.env` en la raíz del backend. Puedes usar el archivo `.env.example` como referencia.

2. Asegúrate de incluir la información de conexión a la base de datos, como:

   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   PORT=3000
   ```

3. Si tienes tablas ya creadas, asegúrate de que la base de datos esté poblada con los datos iniciales.

---

## Ejecución del Proyecto

Para iniciar el backend, ejecuta:

```bash
npm start
```

Esto arrancará el servidor en el puerto especificado en el archivo `.env` y estará listo para manejar solicitudes.

---

## Funcionalidades

- **Gestión de Usuarios:** Registro, inicio de sesión, roles y autenticación.
- **Gestión de Estampas:** CRUD (crear, leer, actualizar, eliminar) de estampas disponibles para las camisetas.
- **Gestión de Pedidos:** Administración de carritos de compra, creación de pedidos y seguimiento de estados.
- **Conexión con la Base de Datos:** Integración segura con MySQL para almacenamiento y consulta de datos.

---

## Tecnologías Utilizadas

- **Node.js**: Plataforma base para el servidor.
- **Express**: Framework de servidor web.
- **MySQL**: Base de datos relacional para almacenamiento.
- **dotenv**: Gestión de variables de entorno.

---

## Estado del Proyecto

El backend está en una etapa activa de desarrollo. Muchas de las funcionalidades ya están implementadas, pero se espera que nuevas características y mejoras se agreguen en futuras versiones.

---

## Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0. Puedes ver más detalles [aquí](https://www.gnu.org/licenses/gpl-3.0.html).

