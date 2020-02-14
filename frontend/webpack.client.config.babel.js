const common = require('./webpack.common.config.babel');
const path = require('path');

const clientConfig = {
  ...common,
  name: 'client',
  target: 'web',
  entry: {
    client: ['@babel/polyfill', './src/index.js'],
  },
  mode: 'production',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
};

module.exports = clientConfig;