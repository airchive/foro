'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
  },

  output: {
    filename: '[name].js',
    path: config.build.assetsRoot,

    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
  
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src'), resolve('test')],

        options: {
          formatter: require('eslint-friendly-formatter'),
        }
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },

      {
        loader: 'url-loader',
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,

        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      },

      {
        loader: 'url-loader',
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,

        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        }
      },

      {
        loader: 'url-loader',
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,

        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        }
      }
    ]
  }
}
