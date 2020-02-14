const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ]
        }
      },
    ]
  },
  name: 'api',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    api: ['@babel/polyfill', './src/index.js']
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'api.js'
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  }
};