const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const { mongooseToObject } = require('../../util/mongoose');

class LessonController {
    //[GET] /Lessons/:slug
    show(req, res, next) {
        Lesson.findOne({ slug: req.params.slug })
            .then(async (lesson) => {
                const question_List = await Question.find({ lesson_id: lesson._id }).lean();
                const answer_List = await Answer.find({ lesson_id: lesson._id }).lean();
                // add answer into question
                for (let i = 0; i < question_List.length; i++) {
                    question_List[i].answer = [];
                    let question_id = question_List[i]._id.toString();

                    for (let j = 0; j < answer_List.length; j++) {
                        if (answer_List[j].question_id === question_id)
                            question_List[i].answer.push(answer_List[j]);
                    }
                }
                // res.json(question_List);
                res.render('lessons/show', {
                    lesson: mongooseToObject(lesson),
                    questions: question_List,
                });
            })
            .catch(next);
    }
    // [GET] /lessons/create/:id
    create(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('lessons/create', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    // [POST] /lessons/store/:id
    store(req, res, next) {
        const image = req.file;
        if (!image) {
            res.status(422).send('Attack file is not an image');
        }
        const formdata = req.body;
        formdata.course_id = req.params.id;
        formdata.imageUrl = image.path;
        const lesson = new Lesson(formdata);
        lesson
            .save()
            .then(() => res.redirect(`/me/stored/lessons/${req.params.id}`))
            .catch(next);
    }

    edit(req, res, next) {
        Lesson.findById(req.params.id)
            .then((lesson) =>
                res.render('lessons/edit', {
                    lesson: mongooseToObject(lesson),
                }),
            )
            .catch(next);
    }

    async update(req, res, next) {
        const lesson = await Lesson.findOne({ _id: req.params.id }).lean();
        const image = req.file;
        if (!image) {
            res.status(422).send('Attack file is not an image');
        }
        const formdata = req.body;
        formdata.imageUrl = image.path;
        Lesson.updateOne({ _id: req.params.id }, formdata)
            .then(() => res.redirect(`/me/stored/lessons/${lesson.course_id}`))
            .catch(next);
    }
    destroy(req, res, next) {
        Lesson.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new LessonController();
