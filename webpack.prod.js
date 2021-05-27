const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyPlugin            = require("copy-webpack-plugin");

const CssminimizerPlugin    = require ('css-minimizer-webpack-plugin');
const Terser                = require ('terser-webpack-plugin');

module.exports = {
    mode: 'production', 
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
            // Disables attributes processing
            sources: false,
            minimize : false,
            },
        },
        {
            test: /\.css$/i,
            exclude: /styles.css$/,
            use: [
                {
                    loader: 'style-loader'
                }, 
                {
                    loader: 'css-loader'
                }
            ]
        },
        {
            test: /styles.css$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
        },
        ]
    },

    optimization: { 
        minimize: true,
        minimizer: [
            new CssminimizerPlugin(),
            new Terser(),
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'My Webpack App',
            filename: './index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder:  false
        }),
        new CopyPlugin ({
            patterns: [
            {from: 'src/assets', to: 'assets/'}
            ]
        })
    ]
}