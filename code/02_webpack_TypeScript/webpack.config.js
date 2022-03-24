const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: 'bundle.js'
  // },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm']
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  })]
}