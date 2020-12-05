const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public'
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'src/devconfig.js')
    }
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {contentBase: path.resolve(__dirname, 'public')},
});