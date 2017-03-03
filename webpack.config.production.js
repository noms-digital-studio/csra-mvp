"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = [
    {
        context: __dirname,
        entry: {
            'main': './src/app/index.js',
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map'
        },
        module: {
            rules: [
                {
                    test: /\.jsx|\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0', 'react'],
                            plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            "resolve-url-loader",
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => {
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',

                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            "resolve-url-loader",
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true,
                                    includePaths: [
                                        path.join(__dirname, "node_modules/govuk-elements-sass/public/sass"),
                                        path.join(__dirname, "node_modules/govuk_frontend_toolkit/stylesheets")
                                    ]
                                }
                            }

                        ]
                    })
                },
                {
                    test: /\.png$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.tmpl.html',
                chunksSortMode: 'dependency'
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new ExtractTextPlugin('style.css'),
            
        ],
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
]