const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');

router.get('/signup', usersController.new);
router.post('/create', usersController.create);
module.exports = router;
