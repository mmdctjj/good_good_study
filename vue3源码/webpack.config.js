const HtmlWepackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'app.js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWepackPlugin({
      template: resolve(__dirname, 'index.html')
    })
  ]
}