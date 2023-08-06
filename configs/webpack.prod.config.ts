import path from 'path';

import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import commonConfig from './webpack.common.config';

const config: Configuration = {
  ...commonConfig,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: `Boards v${process.env.npm_package_version}`,
      favicon: 'public/favicon.svg',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
  ],
};

export default config;
