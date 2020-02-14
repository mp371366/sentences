const clientConfig = require('./webpack.client.config.babel');
const serverConfig = require('./webpack.server.config.babel');

module.exports = [serverConfig, clientConfig];