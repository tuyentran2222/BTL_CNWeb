const express = require('express');
const router = express.Router();
const lessonController = require('../app/controllers/LessonController');

router.get('/create/:id', lessonController.create);
router.post('/store/:id', lessonController.store);
router.get('/:id/edit', lessonController.edit);
router.put('/:id', lessonController.update);
router.delete('/:id', lessonController.destroy);
router.get('/:slug', lessonController.show);

module.exports = router;
