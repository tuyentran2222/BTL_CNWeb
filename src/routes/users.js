const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const { body, check } = require('express-validator');
const User = require('../app/models/User');
router.get('/signup', usersController.new);
router.post(
    '/create',

    check('email')
        .isEmail()
        .withMessage('Please enter with valid email')
        .custom((value, { req }) => {
            // if (value === 'test@test.com') {
            //     throw new Error('This email address is forbidden');
            // }
            // return true;
            return User.findOne({ email: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject('E-Mail exists already,please pick a different one');
                }
            });
        }),
    body(
        'password',
        'Please enter a password with only numbers and text at least 6 characters',
    ).isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password have to match!');
        }
        return true;
    }),
    usersController.create,
);
module.exports = router;
