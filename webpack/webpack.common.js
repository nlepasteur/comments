const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src/index.tsx'),
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '..', 'src/components'),
      services: path.resolve(__dirname, '..', 'src/services'),
      HOC: path.resolve(__dirname, '..', 'src/HOC'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
};
