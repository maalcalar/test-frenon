const express = require('express');
const route = express.Router();

const validator = require('../validators/usuario.validator');

const { crearUsuario, leerUsuario, listarUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controller');
const { leerUsuarioCache } = require('../middlewares/usuario.middleware');

route.post('/', crearUsuario);

route.get('/:id', leerUsuarioCache, leerUsuario);

route.get('/listar/:limit', listarUsuarios);

route.put('/:id', actualizarUsuario);

route.delete('/:id', borrarUsuario);

module.exports = route;