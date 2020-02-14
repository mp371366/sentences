const common = require('./webpack.common.config.babel');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  ...common,
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: ['@babel/polyfill', './src/server.js']
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  }
}

module.exports = serverConfig;