
'use strict'
const path = require('path')

module.exports = {
  build: {
    productionGzip: false,
    assetsPublicPath: '/',
    productionSourceMap: true,
    env: require('./prod.env'),
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],
    assetsRoot: path.resolve(__dirname, '../dist'),
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'),
  },

  dev: {
    proxyTable: {},
    cssSourceMap: false,
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    port: process.env.PORT || 8080,
  }
}
