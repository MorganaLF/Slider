const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const conf = {
  entry: './src/index.ts',
  devServer: {
    overlay: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/pages/demo/demo.pug')
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      {
        from: './src/**/*.jpg',
        to: './images',
        flatten: true
      },
      {
        from: './src/**/*.png',
        to: './images',
        flatten: true
      },
      {
        from: './src/**/*.svg',
        to: './images',
        flatten: true
      }
    ]),
    new CheckerPlugin(),
    require('autoprefixer'),
    //require('cssnano')
  ]

};

module.exports = (env, options) => {
  let production = options.mode === "production";

  conf.devtool = production ? false : "eval-sourcemap";

  let cssMap = !production;
  let publicDir = production ? "https://morganalf.github.io/Slider/dist/" : "/";

  conf.output = {
    path: path.resolve(__dirname, './dist'),
        filename: "main.js",
        publicPath: publicDir
  };

  conf.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.styl']
  };

  conf.module = {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          "baseUrl": "./node_modules/@types",
          "typeRoots": ["./node_modules/@types"],
          "types": [
            "jasmine",
            "jasmine-jquery"
          ],
          "useBabel": true,
          "babelOptions": {
            "babelrc": false, /* Important line */
            "presets": [
              ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
            ]
          },
          "babelCore": "@babel/core", // needed for Babel v7
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
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: cssMap ? 'inline' : false,
                plugins: function() {
                  if (production) {
                    return [
                      require('autoprefixer'),
                      require('cssnano')
                    ]
                  } else {
                    return [
                      require('autoprefixer')
                    ]
                  }
                }
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(ttf|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  };

  return conf;
};