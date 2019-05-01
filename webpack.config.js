const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = (env, options) => {
  const production = options.mode === 'production';
  const cssMap = !production;
  const publicDir = production ? 'https://morganalf.github.io/Slider/dist/' : '/';

  return {
    entry: './src/index.ts',
    devServer: {
      overlay: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    devtool: production ? false : 'eval-sourcemap',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
      publicPath: publicDir,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          options: {
            "baseUrl": "./node_modules/@types",
            "typeRoots": ["./node_modules/@types"],
            "types": [
              "jasmine",
              "jasmine-jquery",
            ],
            "useBabel": true,
            "babelOptions": {
              "babelrc": false,
              "presets": [
                ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }],
              ]
            },
            "babelCore": "@babel/core",
          },
          exclude: [/node_modules\/(?!(@types)\/).*/]
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: cssMap,
                  url: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: cssMap ? 'inline' : false,
                  plugins() {
                    if (production) {
                      return [
                        require('autoprefixer'),
                        require('cssnano'),
                        require('postcss-pxtorem')({
                          rootValue: 14,
                          unitPrecision: 5,
                          propList: ['*', '!max-width', '!min-width'],
                          selectorBlackList: ['html'],
                          replace: true,
                          mediaQuery: false,
                          minPixelValue: 0,
                        }),
                      ];
                    }
                    return [
                      require('autoprefixer'),
                      require('postcss-pxtorem')({
                        rootValue: 14,
                        unitPrecision: 5,
                        propList: ['*', '!max-width', '!min-width'],
                        selectorBlackList: ['html'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                      }),
                    ];
                  },
                },
              },
              'stylus-loader',
            ],
          }),
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
        {
          test: /\.(ttf|woff|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './src/pages/demo-page/demo-page.pug')
      }),
      new ExtractTextPlugin('styles.css'),
      new CopyWebpackPlugin([
        {
          from: './src/components/**/*.svg',
          to: './images',
          flatten: true,
        },
        {
          from: './src/favicons/**/*.*',
          to: './',
          flatten: true,
        },
      ]),
      new CheckerPlugin(),
    ],
  };
};
