const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const pages = fs.readdirSync(path.resolve('src'))
              .filter(fileName => fileName.endsWith('.html'));

const output = {
    js: 'js/',
    css: 'css/',
    img: 'images/',
    fonts: 'fonts/',
    svg: 'svg/',
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config;
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env'
      ]
    }
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './common/scripts/scripts.js'],
  },
  output: {
    filename: `${output.js}[name].min.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins : [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/common/images'),
        to: path.resolve(__dirname, './dist/images')
      },
      { 
        from: path.resolve(__dirname, './src/common/fonts'), 
        to: path.resolve(__dirname, './dist/fonts')
      },
      { 
        from: path.resolve(__dirname, './src/common/svg'), 
        to: path.resolve(__dirname, './dist/images')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: `${output.css}[name].css`
    }),
    new SpritePlugin({
      plainSprite: true
    }),
    ...pages.map(page => new HTMLWebpackPlugin({
      template: `${page}`,
      filename: `${page}`
    })),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: `${output.img}icons.svg`,
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: jsLoaders()
      },
      {
        test: /\.html$/i,
        use: [ {
          loader: 'underscore-template-loader',
        }],
      },
    ]
  }
}