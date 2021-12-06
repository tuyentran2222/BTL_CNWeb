const express = require('express');
const router = express.Router();
const sessionController = require('../app/controllers/SessionController');

router.get('/', sessionController.new);
router.post('/', sessionController.create);
router.delete('/', sessionController.destroy);
module.exports = router;
