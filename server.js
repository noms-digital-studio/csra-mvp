const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const requireAuth = require('./server/require-auth');
const devBuild = require('./server/dev-build');

// config parsing
const env = process.env;
const port = env.PORT || '5000';
const dev = !env.NODE_ENV || env.NODE_ENV === 'development';
const authUser = env.BASIC_AUTH_USER;
const authPass = env.BASIC_AUTH_PASS;

// Express app
const app = express();
app.enable('trust proxy');
app.disable('x-powered-by');

app.use(morgan(dev ? 'dev' : 'short'));

if (authUser) {
  app.use(requireAuth(authUser, authPass));
}

if (dev) {
  app.use(devBuild());
}

app.use('/', express.static(path.join(__dirname, 'dist')));

// actually listening
const server = http.createServer(app);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on http://localhost:${port}`);
});
