// Dependencies
const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const accessLogger = require('koa-pino-logger');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

// Config
const config = require('./config');

// Logger
const logger = require('./logger');

// Router
const router = new Router();
router.use(require('./routes'));

// Koa application
const app = new Koa();
require('./lib/koa-extensions')(app);

// Middlewares
const { errorHandler } = require('./middlewares');

// Koa middlewares stack
app.use(errorHandler());
app.use(helmet());
app.use(accessLogger());
app.use(compress());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// Server
const server = http.createServer(app.callback());
server.listen(config.get('app.port'), () => {
  logger.info(`Server is listening on port ${config.get('app.port')}`);
});

// Graceful shutdown (Docker sent SIGTERM, pm2 catch and forward SIGINT to each processes)
const SHUTDOWN_SIGNAL = process.env.SHUTDOWN_SIGNAL || 'SIGINT';
process.once(SHUTDOWN_SIGNAL, () => {
  if (!server.listening) {
    logger.info('Server is currently not listening to any traffic');
    return process.exit(0);
  }

  logger.info('Begin terminating server...');
  server.close(() => {
    logger.info('Server terminated!!');
    process.exit(0);
  });
});

// Log Unexpected Exception(s) Before Dying
process.once('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  process.exit(1);
});
