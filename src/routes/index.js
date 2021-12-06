const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./courses');
const meRouter = require('./me');
const userRouter = require('./users');
const sessionRouter = require('./session');
function route(app) {
    app.use('/login', sessionRouter);
    app.use('/users', userRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
