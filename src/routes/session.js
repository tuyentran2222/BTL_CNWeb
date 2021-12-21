const express = require('express');
const router = express.Router();
const sessionController = require('../app/controllers/SessionController');
const { body, check } = require('express-validator');
router.get('/', sessionController.new);
router.post(
    '/',
    check('email').isEmail().withMessage('Please enter with valid email'),
    body(
        'password',
        'Please enter a password with only numbers and text at least 6 characters',
    ).isLength({ min: 6 }),
    sessionController.create,
);
router.delete('/', sessionController.destroy);
module.exports = router;
