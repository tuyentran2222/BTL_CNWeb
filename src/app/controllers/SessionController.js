const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
class SessionController {
    // [GET] /Session/
    new(req, res, next) {
        res.render('sessions/new', {
            oldInput: { email: '', password: '' },
            redirect_url: req.query.redirect_url,
        });
    }

    async create(req, res, next) {
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).render('sessions/new', {
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });
        }

        const { email } = req.body;
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(400).render('sessions/new', {
                errorMessage: 'Invalid email or password',
                oldInput: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.user_id = user._id;
            if (req.body.redirect_url) {
                res.redirect(req.body.redirect_url);
            } else res.redirect('/');
        } else {
            return res.status(400).render('sessions/new', {
                errorMessage: 'Invalid email or password',
                oldInput: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });
        }
    }

    destroy(req, res, next) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}

module.exports = new SessionController();
