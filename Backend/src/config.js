require('dotenv').config()

module.exports = {
    app: {
        port : process.env.PORT || 4000
    },
    mysql: {
        host : process.env.MYSQL_HOST || '',
        port : process.env.MYSQL_PORT || '',
        user : process.env.MYSQL_USER || '',
        password : process.env.MYSQL_PASS || '',
        database : process.env.MYSQL_DDBB || ''
    }
}