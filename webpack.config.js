"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = [
    {
        context: __dirname,
        entry: {
            'main': './src/javascript/index.js',
        },
        output: {
            path: __dirname + 'dist/',
            filename: '[name].bundle.js',
            publicPath: '/'
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
                        {
                            loader: 'postcss-loader',
                            options: {
                            plugins: function () {
                                return [
                                require('precss'),
                                require('autoprefixer')
                                ];
                            }
                            }
                        }
                    ]
                },
                {
                    test: /\.scss/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader", 
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    path.join(__dirname, "node_modules/govuk-elements-sass/public/sass"),
                                    path.join(__dirname, "node_modules/govuk_frontend_toolkit/stylesheets"),     
                                ]
                            }
                        }
                    
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: ['url-loader?limit=10000']
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        "url-loader?limit=10000",
                        // "file-loader?name=[name].[hash:8].[ext]"
                    ],
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
]