const { Pool } = require('pg');
const yenv = require('yenv');
const env = yenv();

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PWD || 'mysecretpassword',
    database: process.env.POSTGRES_DB || 'testapi',
    port: process.env.POSTGRES_PORT || '5432'
});

const initialize = async () => {
    const promiseConnection = new Promise((resolve, reject) => {
        const waitFor = setInterval(() => {
            pool.connect((err, client, release) => {
                if(err) {
                    // reject(err);
                    return console.error('Error acquiring client', err.stack);
                }
                client.query('SELECT NOW()', (err, result) => {
                    release();
                    if(err) {
                        // reject(err);
                        return console.error('Error executing query', err.stack);
                    }
                });
                console.log('Connected to Postgres');
                clearInterval(waitFor);
                resolve();
            });
        }, 5);
    });

  await promiseConnection;
};

const getPool = () => pool;

const closePool = () => {
    pool.end();
};

module.exports = { initialize, getPool, closePool };
