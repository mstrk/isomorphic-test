/*
 *
 * Webpack DEVELOPMENT configuration file
 *
 */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    output: {
      path: path.resolve(__dirname, 'src', 'public'),
      filename: 'js/bundle.js'
    },

    plugins: [
      new ExtractTextPlugin({ filename: 'css/styles.css' }),
      new webpack.NamedModulesPlugin()
    ],

    devtool: 'eval-source-map'
}
