const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development', 
    output: {
        clean: true
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
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'My Webpack App',
            filename: './index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder:  false
        }),
        new CopyPlugin ({
            patterns: [
            {from: 'src/assets', to: 'assets/'}
            ]
        })
    ]
}