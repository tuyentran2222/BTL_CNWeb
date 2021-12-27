const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    //[GET] /:type
    learn(req, res, next) {
        Course.find({ type: req.params.type })
            .then((courses) => {
                res.render('video', {
                    courses: multipleMongooseToObject(courses),
                    type: req.params.type,
                });
            })
            .catch(next);
    }
    //[GET] /search
    async search(req, res) {
        console.log(req.query.type);
        const query = {};
        const resultCourse = [];

        if (req.query.type) query.type = req.query.type;

        const allCourse = await Course.find(query).lean();
        for (let i = 0; i < allCourse.length; i++) {
            const course = allCourse[i];
            if (
                course.name.toLowerCase().indexOf(req.query.searchCourse.toLowerCase()) !== -1 ||
                course.description.toLowerCase().indexOf(req.query.searchCourse.toLowerCase()) !==
                    -1
            )
                resultCourse.push(course);
        }
        res.render('video', { courses: resultCourse });
    }
}

module.exports = new SiteController();
