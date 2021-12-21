const express = require('express');
const router = express.Router();
const answerController = require('../app/controllers/answerController');

router.get('/create/:id', answerController.create);
router.post('/store/:id', answerController.store);
router.get('/:id/edit', answerController.edit);
router.put('/:id', answerController.update);
router.delete('/:id', answerController.destroy);

module.exports = router;
