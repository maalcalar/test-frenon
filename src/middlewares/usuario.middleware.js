const { getClient } = require('../services/cache.service');

const client = getClient();

const leerUsuarioCache = (req, res, next) => {
    const usuario_id = req.params.id;

    client.get(`usuario:${usuario_id}`, (err, data) => {
        if(err) {
            throw err;
        }
        if(data !== null) {
            const usuario = JSON.parse(data);
            res.json({
                status: 200,
                message: 'OK',
                stack: usuario
            });
        } else {
            next();
        }
    });
}

module.exports = { leerUsuarioCache }