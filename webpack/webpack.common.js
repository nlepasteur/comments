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
      utils: path.resolve(__dirname, '..', 'src/utils'),
      hooks: path.resolve(__dirname, '..', 'src/hooks'),
      application: path.resolve(__dirname, '..', 'src/application'),
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
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public/index.html'),
    }),
  ],
};
