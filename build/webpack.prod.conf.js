'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      extract: true,
      sourceMap: config.build.productionSourceMap,
    })
  },

  devtool: config.build.productionSourceMap ? '#source-map' : false,

  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      sourceMap: true
    }),

    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      }
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: config.build.index,

      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },

      chunksSortMode: 'dependency',
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),

      minRatio: 0.8,
      threshold: 10240,
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
