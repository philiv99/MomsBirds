
const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {test: /\.jsx$/, exclude: /node_modules/, use: 'babel-loader'},
      // {test: /\.(jpe?g|png|gif|svg)$/i, exclude: /node_modules/, use: 'url-loader'},
      {test: /\.(scss|css|less)$/, use: ['style-loader','css-loader','less-loader']},
      {test: /\.(eot|woff|woff2|ttf)$/, use: ['file-loader', 'url-loader']},
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery'})
  ]
};