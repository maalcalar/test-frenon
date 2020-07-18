const serviceDatabase = require('./services/database.service');
const serviceServer = require('./services/server.service');
const serviceCache = require('./services/cache.service');

const start = async () => {
  try {
    await serviceDatabase.initialize();
    await serviceCache.initialize();
    await serviceServer.initialize();
  } catch (error) {
    console.log('An error has happened: ' + error);
  }
};

start();
