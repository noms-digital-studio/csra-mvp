"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = [
    {
        context: __dirname,
        entry: {
            'main': './src/app/index.js',
        },
        output: {
            path: __dirname + 'dist/assets',
            filename: '[name].bundle.js',
            publicPath: '/assets'
        },
        devServer: {
            contentBase: __dirname,
        },
        module: {
            rules: [
                {
                    test: /\.jsx|\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader",
                    ]
                },
                {
                    test: /\.scss/,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    path.join(__dirname, "node_modules/govuk-elements-sass/public/sass"),
                                    path.join(__dirname, "node_modules/govuk_frontend_toolkit/stylesheets"),
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.png$/,
                    loader: "file-loader",
                    options: { prefix: "img/" }
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
]