const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
var path = require('path');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const User = require('./app/models/User');
// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//Http logger
app.use(morgan('combined'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use(async (req, res, next) => {
    res.locals.login = {
        admin: false,
        status: false,
    };

    if (req.session.user_id) {
        res.locals.login.status = true;
        const user = await User.findOne({ _id: req.session.user_id }).lean();
        res.locals.login.admin = user.admin;
    }
    next();
});
// template engine
var hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
