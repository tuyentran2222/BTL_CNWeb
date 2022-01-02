const newsRouter = require('./news');
const siteRouter = require('./site');
const answerRouter = require('./answers');
const questionRouter = require('./questions');
const lessonRouter = require('./lessons');
const courseRouter = require('./courses');
const grammarRouter = require('./grammar');
const meRouter = require('./me');
const userRouter = require('./users');
const sessionRouter = require('./session');
function route(app) {
    app.use('/login', sessionRouter);
    app.use('/users', userRouter);
    app.use('/answers', answerRouter);
    app.use('/questions', questionRouter);
    app.use('/lessons', lessonRouter);
    app.use('/courses', courseRouter);
    app.use('/grammar', grammarRouter);
    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
