const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Grammar = require('../models/Grammar');
const { multipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    //[GET] /me/stored/answers/:id
    storedAnswers(req, res, next) {
        Answer.find({ question_id: req.params.id })
            .then((answers) =>
                res.render('me/storedAnswers', {
                    items: multipleMongooseToObject(answers),
                    question_id: req.params.id,
                }),
            )
            .catch(next);
    }

    //[GET] /me/stored/questions/:id
    storedQuestions(req, res, next) {
        Question.find({ lesson_id: req.params.id })
            .then((questions) =>
                res.render('me/storedQuestions', {
                    items: multipleMongooseToObject(questions),
                    lesson_id: req.params.id,
                }),
            )
            .catch(next);
    }

    //[GET] /me/stored/Lessons/:id
    storedLessons(req, res, next) {
        Lesson.find({ course_id: req.params.id })
            .then((lessons) =>
                res.render('me/storedLessons', {
                    items: multipleMongooseToObject(lessons),
                    course_id: req.params.id,
                }),
            )
            .catch(next);
    }

    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/storedCourses', {
                    items: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    storedGrammars(req, res, next) {
        Grammar.find({})
            .then((grammars) =>
                res.render('me/storedGrammars', {
                    items: multipleMongooseToObject(grammars),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
