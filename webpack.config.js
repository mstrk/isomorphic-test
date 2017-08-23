/*
 *
 * Webpack configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const _ = require('lodash')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const devConfig = require('./webpack.dev.config.js')
const prodConfig = require('./webpack.prod.config.js')

// Globals
const NODE_ENV = process.env.NODE_ENV || 'development'
const __DEV__ = NODE_ENV !== 'production'
const __PROD__ = NODE_ENV === 'production'
const __SERVER__ = false
const __CLIENT__ = true

const WebpackToolsPlugin = require('webpack-isomorphic-tools/plugin')
const isomorphicToolsConfig = require('./isomorphic-tools.config')

const webpackToolsPlugin = new WebpackToolsPlugin(isomorphicToolsConfig)
  .development(__DEV__)

const all = {
  entry: path.resolve(__dirname, 'src', 'client', 'index.js'),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src', 'client'),
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: webpackToolsPlugin.regularExpression('images'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: __PROD__ ? 'images/[name]-[hash].[ext]' : 'images/[name].[ext]',
              emitFile: __PROD__
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: __PROD__ }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([autoprefixer({ browsers: ['last 3 versions', '> 1%'] })])
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'extended'
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
      __DEV__,
      __SERVER__,
      __CLIENT__
    }),
    webpackToolsPlugin
  ]
}

const config = _.mergeWith({}, all, NODE_ENV === 'development' ? devConfig : prodConfig, function(a, b) {
  if (_.isArray(a)) {
    return b.concat(a);
  }
})

module.exports = config
