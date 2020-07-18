const redis = require('redis');
const client = redis.createClient({host: 'redis'});

client.on('error', () => {
    console.log('Error acquiring redis');
});

const initialize = async () => {
    const promiseConnection = new Promise((resolve, reject) => {
        try {
            client.set('testconn', 'true', (err, resp) => {
                if(err) {
                    reject(err);
                    return console.error('Error acquiring redis', err.stack);
                }
                console.log('Connected to Redis');
                resolve();
            });
        } catch (error) {
            console.log('Connected to Redis');
            reject(err);
        }
    });
  
    await promiseConnection;
};

const getClient = () => client;

const closeClient = () => {
    client.quit();
};

module.exports = { initialize, getClient, closeClient };