/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('../webpack.config');

module.exports = function devBuild() {
  // eslint-disable-next-line no-console
  console.log('enabling development build');

  const router = express.Router();

  // Attach webpack in watch mode to the server
  const compiler = webpack(webpackConfig);
  // eslint-disable-next-line no-console
  compiler.plugin('compile', () => console.log('Building webpack bundle...'));
  router.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }));

  return router;
};
