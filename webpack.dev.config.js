const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack')


module.exports = {
    entry: {
        'si-client': './src/index.tsx'
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "public")
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                include: [
                    path.resolve(__dirname, "src")
                ]
            },
            {
                test: /\.(css$|scss)/,
                loaders: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'sass-loader',
                ],
                include: [
                    path.resolve(__dirname, "src"),
                  /node_modules/,
                  "/src/styles"
                ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i, 
              loader: "file-loader",
              include: path.resolve(__dirname, "src"),
            },
            {
              test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
              loader: 'file-loader',
            }
        ],
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        unsafeCache: true
    },

    performance: {
        //hints: "warning",
        maxAssetSize: 2000000,
        maxEntrypointSize: 4000000,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    devtool: "cheap-module-source-map",
    stats: 'verbose',
    devServer: {
        contentBase: 'public/',
        compress: true,
        port: 3000,
        noInfo: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: 'si-client',
            template: 'public/index.ejs'
        }),

        new webpack.HotModuleReplacementPlugin(),
        new DotEnv({
          safe: true,
          silent: false
        })
    ],
   node: {
      console: false,
      fs: 'empty',
      //net: 'empty',
      //tls: 'empty'
    },
    cache: true,
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 500,
    },
};
