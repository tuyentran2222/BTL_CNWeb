const Answer = require('../models/Answer');
const Question = require('../models/Question');

const { mongooseToObject } = require('../../util/mongoose');

class answerController {
    // [GET] /answers/create/:id
    create(req, res, next) {
        Question.findById(req.params.id)
            .then((question) =>
                res.render('answers/create', {
                    question: mongooseToObject(question),
                }),
            )
            .catch(next);
    }

    // [POST] /answers/store/:id
    async store(req, res, next) {
        const formdata = req.body;
        formdata.isTrue = formdata.hasOwnProperty('isTrue');
        formdata.question_id = req.params.id;
        const question = await Question.findOne({ _id: req.params.id }).lean();
        formdata.lesson_id = question.lesson_id;

        const answer = new Answer(formdata);
        answer
            .save()
            .then(() => res.redirect(`/me/stored/answers/${req.params.id}`))
            .catch(next);
    }

    edit(req, res, next) {
        Answer.findById(req.params.id)
            .then((answer) =>
                res.render('answers/edit', {
                    answer: mongooseToObject(answer),
                }),
            )
            .catch(next);
    }
    //[PUT] /answers/:id
    async update(req, res, next) {
        const answer = await Answer.findOne({ _id: req.params.id }).lean();
        // res.json(answer);
        Answer.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect(`/me/stored/answers/${answer.question_id}`))
            .catch(next);
    }
    destroy(req, res, next) {
        Answer.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new answerController();
