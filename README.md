# Proyecto de Venta de Camisetas Personalizables

Este proyecto es una plataforma web que permite a los usuarios personalizar camisetas con estampas únicas y comprarlas de manera sencilla.

---

## Descripción General

El objetivo de este proyecto es crear una experiencia interactiva donde los clientes puedan elegir estampas exclusivas para camisetas, gestionarlas fácilmente, y completar sus compras a través de una interfaz moderna y amigable. Aunque el proyecto aún se encuentra en desarrollo, ya cuenta con funcionalidades importantes y una arquitectura base sólida.

---

## Estructura del Proyecto 

La estructura principal del proyecto está organizada en las siguientes carpetas:

- **Frontend:** Contiene el código fuente del cliente web, desarrollado en React y diseñado para ofrecer una experiencia de usuario fluida y visualmente atractiva.
- **Backend:** Incluye los servicios del lado del servidor, construidos en Node.js y Express, encargados de manejar las operaciones de base de datos, la lógica de negocio y la autenticación de usuarios.
- **Base de Datos:** Scripts SQL necesarios para la creación y actualización de las tablas en la base de datos MySQL, asegurando una estructura de datos consistente y bien documentada.

---

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de contar con:

- **Node.js**: Versiones recientes de Node.js y npm, para instalar dependencias y ejecutar el frontend y backend.
- **MySQL**: Una instancia de MySQL en funcionamiento para almacenar los datos de usuarios, camisetas y estampas.
- **Editor de Código**: Visual Studio Code u otro editor de tu preferencia para explorar y modificar el código.

---

## Instalación

1. Clona este repositorio en tu máquina local.

2. Accede a la carpeta del proyecto y navega a las subcarpetas del frontend y backend según sea necesario.

3. En cada subcarpeta (por ejemplo, `frontend` y `backend`), ejecuta:

   ```bash
   npm install
   ```

   Esto instalará las dependencias necesarias para el frontend y el backend.

4. Asegúrate de configurar las variables de entorno necesarias. Crea un archivo `.env` en el backend con los detalles de tu conexión a la base de datos y otros ajustes (puedes usar `.env.example` como referencia).

---

## Ejecución

Para iniciar el proyecto:

1. **Base de Datos:**
   - Ejecuta los scripts SQL proporcionados en la carpeta `db_scripts` para crear las tablas necesarias.
   - Asegúrate de que el servicio MySQL esté funcionando.

2. **Backend:**
   - En la carpeta `backend`, ejecuta:
     ```bash
     npm start
     ```
   - Esto iniciará el servidor en el puerto especificado en tu archivo `.env`.

3. **Frontend:**
   - En la carpeta `frontend`, ejecuta:
     ```bash
     npm start
     ```
   - Esto abrirá el cliente web en tu navegador por defecto.

---

## Funcionalidades Clave

- **Personalización de camisetas:** Los usuarios pueden seleccionar estampas predefinidas y aplicarlas a camisetas de diferentes colores y tallas.
- **Carrito de compras:** Los clientes pueden agregar camisetas personalizadas a un carrito y realizar el proceso de compra.
- **Gestión de estampas:** Artistas  pueden subir nuevas estampas y administrarlas desde un panel de control.
- **Autenticación y roles:** Sistema de registro e inicio de sesión, con permisos diferenciados para administradores y usuarios comunes.
- **Estadísticas y reportes:** Panel para visualizar las ventas totales, las camisetas más populares, y otros datos relevantes.

---

## Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0. Puedes ver más detalles [aquí](https://www.gnu.org/licenses/gpl-3.0.html).

