const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
class UsersController {
    // [GET] /Users/
    new(req, res, next) {
        let message = req.flash('error');
        if (message) {
            message = message[0];
        } else {
            message = null;
        }
        res.render(
            'users/new',

            {
                errorMessage: message,
                oldInput: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                validationErrors: [],
            },
        );
    }

    async create(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render('users/new', {
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                },
                validationErrors: errors.array(),
            });
        }
        // const user = await User.findOne({ email: req.body.email }).lean();
        // console.log(user);
        // if (user) {
        //     req.flash('error', 'E-Mail exists already,please pick a different one ');
        //     return res.redirect('/users/signup');
        // }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const formdata = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            };
            console.log(hashedPassword);
            const user = new User(formdata);
            user.save()
                .then(async (err) => {
                    const user = await User.findOne({ email: formdata.email }).lean();
                    req.session.user_id = user._id;
                    res.redirect('/');
                })
                .catch(next);
        } catch {
            res.status(500).send();
        }
    }
}

module.exports = new UsersController();
