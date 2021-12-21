const Question = require('../models/Question');
const Lesson = require('../models/Lesson');
const { mongooseToObject } = require('../../util/mongoose');

class QuestionController {
    // [GET] /questions/create/:id
    create(req, res, next) {
        Lesson.findById(req.params.id)
            .then((lesson) =>
                res.render('questions/create', {
                    lesson: mongooseToObject(lesson),
                }),
            )
            .catch(next);
    }

    // [POST] /questions/store/:id
    store(req, res, next) {
        const formdata = req.body;
        formdata.lesson_id = req.params.id;
        const question = new Question(formdata);
        question
            .save()
            .then(() => res.redirect(`/me/stored/questions/${req.params.id}`))
            .catch(next);
    }
    // [GET] /questions/:id/edit
    edit(req, res, next) {
        Question.findById(req.params.id)
            .then((question) =>
                res.render('questions/edit', {
                    question: mongooseToObject(question),
                }),
            )
            .catch(next);
    }

    async update(req, res, next) {
        const question = await Question.findOne({ _id: req.params.id }).lean();
        Question.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect(`/me/stored/questions/${question.lesson_id}`))
            .catch(next);
    }
    destroy(req, res, next) {
        Question.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new QuestionController();
