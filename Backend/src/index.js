const db = require('./DB/mysql')
const app = require('./app')

db.conexionDB()

app.listen(app.get("port"), () =>{
    console.log("App servida en puerto ", app.get("port"))
})
//comentado