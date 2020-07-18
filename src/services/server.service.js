const yenv = require('yenv');
const env = yenv('env.yaml', { env: process.env.NODE_ENV || 'base' });
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);

// Settings
app.set('json spaces', 2);

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas
const routeUsuario = require('../routes/usuario.route');

app.use('/api/usuario', routeUsuario);

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'ok',
        stack: []
    });
});

const initialize = async () => {
    const promise = new Promise((resolve, reject) => {
        server
            .listen(env.PORT)
            .on('listening', () => {
                console.log(`Server is running on port ${env.PORT}`);
                resolve();
            })
            .on('error', (error) => {
                console.log('Error in server: ' + error);
                reject(error);
            });
    });

    await promise;
}

module.exports = { initialize };