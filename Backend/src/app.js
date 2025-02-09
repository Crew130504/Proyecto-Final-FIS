const express = require('express') 
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const rutas = require('./controllers/rutas')

// Documentacion
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerSpecs = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API documentacion: E - commerce de camisetas',
            version: '1.0.0',
            
        }
    },
    apis: [
        `${path.join(__dirname, "./controllers/*.js")}`
    ]
}

const app = express()
app.use(cors())
// Configuracion
app.set('port', config.app.port)

app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());
app.use(morgan("dev"))


// Servir la carpeta 'public' como archivos estáticos
app.use('/src/public/imagenes-estampas', express.static(path.join(__dirname, 'public/imagenes-estampas')));
// Rutas
app.use('/',rutas)
// Ruta para documentacion
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpecs)))

module.exports = app