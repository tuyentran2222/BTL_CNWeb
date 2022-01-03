const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:id
    show(req, res, next) {
        Lesson.find({ course_id: req.params.id })
            .then((lessons) => {
                res.render('courses/show', {
                    lessons: multipleMongooseToObject(lessons),
                });
            })
            .catch(next);
    }
    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create', {
            oldInput: {
                name: '',
                description: '',
            },
        });
    }
    //[POST] /courses/create
    store(req, res, next) {
        const image = req.file;
        const message = 'Attack file is not an image';
        if (!image) {
            return res.status(422).render('courses/create', {
                errorMessage: message,
                oldInput: {
                    name: req.body.name,
                    description: req.body.description,
                },
            });
        }
        const formdata = req.body;
        formdata.imageUrl = image.path;
        const course = new Course(formdata);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        const formdata = req.body;
        const image = req.file;
        if (image) {
            formdata.imageUrl = image.path;
        }

        Course.updateOne({ _id: req.params.id }, formdata)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
