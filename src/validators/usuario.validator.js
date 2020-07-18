const schemas = {
    POST: (req, res, next) => {
        const { nombre, apellido, email } = req.body;
        if(!(nombre && apellido && email)) {
            throw new Error('Datos inválidos');
        }
        next();
    }
};

module.exports = schemas;
