// Dependencies
const Router = require('koa-router');

// Router
const router = new Router();

// Controllers
const { auth, user } = require('./controllers');

// Auth routes
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

// User routes
router.get('/users', user.list);
router.get('/users/:user_id', user.get);

// Exports
module.exports = router.routes();
