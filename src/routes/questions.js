const express = require('express');
const router = express.Router();
const questionController = require('../app/controllers/QuestionController');

router.get('/create/:id', questionController.create);
router.post('/store/:id', questionController.store);
router.get('/:id/edit', questionController.edit);
router.put('/:id', questionController.update);
router.delete('/:id', questionController.destroy);

module.exports = router;
