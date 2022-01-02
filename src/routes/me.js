const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/answers/:id', meController.storedAnswers);
router.get('/stored/questions/:id', meController.storedQuestions);
router.get('/stored/lessons/:id', meController.storedLessons);
router.get('/stored/courses', meController.storedCourses);
router.get('/stored/grammars', meController.storedGrammars);
module.exports = router;
