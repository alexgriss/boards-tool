import path from 'path';
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default commonConfig;
