const User = require('../models/User');
const bcrypt = require('bcrypt');

class SessionController {
    // [GET] /Session/
    new(req, res, next) {
        res.render('sessions/new');
    }

    async create(req, res, next) {
        const { username } = req.body;
        const user = await User.findOne({ username }).lean();

        if (!user) {
            return res.status(400).send('cannot find user');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.user_id = user._id;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    }

    destroy(req, res, next) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}

module.exports = new SessionController();
