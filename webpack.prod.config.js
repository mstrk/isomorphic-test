/*
 *
 * Webpack PRODUCTION configuration file
 *
 */

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: 'js/app-[hash].js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'css/app-[hash].css' }),
    new BabiliPlugin(),
    new Visualizer({
      filename: './statistics.html'
    })
  ]
}
