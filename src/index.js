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
const multer = require('multer');
const flash = require('connect-flash');
const LoginStateMiddleWare = require('./app/middlewares/LoginStateMiddleWare');
// Connect to db
db.connect();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {
        const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniquePreffix + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(flash());
app.use('/src/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
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

app.use(LoginStateMiddleWare);
// template engine
var hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        isVideo: (a) => a === 'video',
        warn: (a, b) => {
            return a.find((e) => e.param === b) ? 'invalid' : '';
        },
    },
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
