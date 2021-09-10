const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const PATHS = {
  dist: path.join(__dirname, 'dist'),
  src: path.join(__dirname, 'src'),
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
      ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        `${PATHS.src}/**/*.css`,
        `${PATHS.dist}/index.html`,
      ], { nodir: true }),
    }),
  ],
};
