exports.success = function(req, res, mensaje = 'Vacio...', status = 200){
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    })
}

exports.error = function(req, res, mensaje = 'Error ', status = 500){
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    })
}