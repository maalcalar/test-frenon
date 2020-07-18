const usuarios = require('../data/usuarios.json');
const { getPool } = require('../services/database.service');
const { getClient } = require('../services/cache.service');

const pool = getPool();
const client = getClient();

const crearUsuario = async (req, res) => {
    await pool.query('INSERT INTO usuarios (nombre, apellido, email) VALUES ($1, $2, $3)', [req.body.nombre, req.body.apellido, req.body.email], async (err,resp) => {
        if(err) {
            res.json({
                status: 500,
                message: 'Internal server error',
                stack: []
            });
        }
        const nuevo_usuario = await pool.query('SELECT * FROM usuarios ORDER BY id DESC LIMIT 1');
        res.json({
            status: 200,
            message: 'Usuario creado',
            stack: nuevo_usuario.rows
        });
    });
}

const leerUsuario = async (req, res) => {
    await pool.query('SELECT * FROM usuarios WHERE id = $1', [req.params.id], (err, resp) => {
        if(err) {
            res.json({
                status: 500,
                message: 'Internal server error',
                stack: []
            });
        }
        client.setex(`usuario:${req.params.id}`, 3600, JSON.stringify(resp.rows));
        res.json({
            status: 200,
            message: 'OK',
            stack: resp.rows
        });
    });
}

const listarUsuarios = async (req, res) => {
    await pool.query('SELECT * FROM usuarios LIMIT $1', [req.params.limit], (err, resp) => {
        if(err) {
            res.json({
                status: 500,
                message: 'Internal server error',
                stack: []
            });
        }
        res.json({
            status: 200,
            message: 'OK',
            stack: resp.rows
        });
    });
}

const actualizarUsuario = async (req, res) => {
    await pool.query('UPDATE usuarios SET nombre = $1, apellido = $2, email = $3 WHERE id = $4', [req.body.nombre, req.body.apellido, req.body.email, req.params.id], async (err, resp) => {
        if(err) {
            res.json({
                status: 500,
                message: 'Internal server error',
                stack: []
            });
        }
        const usuario_modificado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [req.params.id]);
        res.json({
            status: 200,
            message: 'Usuario actualizado',
            stack: usuario_modificado.rows
        });
    });
}

const borrarUsuario = async (req, res) => {
    const usuario_borrar = await pool.query('SELECT * FROM usuarios WHERE id = $1', [req.params.id]);
    await pool.query('DELETE FROM usuarios WHERE id = $1', [req.params.id], (err, resp) => {
        if(err) {
            res.json({
                status: 500,
                message: 'Internal server error',
                stack: []
            });
        }
        res.json({
            status: 200,
            message: 'Usuario eliminado',
            stack: usuario_borrar.rows
        });
    });
}

module.exports = {
    crearUsuario,
    leerUsuario,
    listarUsuarios,
    actualizarUsuario,
    borrarUsuario
}