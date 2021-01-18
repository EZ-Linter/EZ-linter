const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { web, node } = require('webpack');
module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'client/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  devServer: {
    //server: 'ws',
    publicPath:"/build",
    contentBase:path.resolve(__dirname, 'client'),
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.html', '.scss']
  },
}