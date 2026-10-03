
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Read the SPA version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));
const spaVersion = packageJson.version;

module.exports = {
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {test: /\.jsx$/, exclude: /node_modules/, use: 'babel-loader'},
      {
        test: /\.(scss|css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {test: /\.(eot|woff|woff2|ttf)$/, use: ['file-loader', 'url-loader']},
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(spaVersion)
    }),
    new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery'}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/template.html')
    })
  ]
};