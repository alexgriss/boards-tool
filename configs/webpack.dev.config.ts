import path from 'path';

import { Configuration as WebpackConfiguration } from 'webpack';

import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import commonConfig from './webpack.common.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  ...commonConfig,
  mode: 'development',
  output: {
    publicPath: '/',
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
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, '..', 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
  },
};

export default config;
