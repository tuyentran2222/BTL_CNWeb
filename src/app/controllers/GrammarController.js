
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const Grammar = require('../models/Grammar');

class GrammarController {
    //[POST] /grammar/create
    store(req, res, next) {
        const formdata = req.body;
        console.log(formdata);
        const grammar = new Grammar(formdata);
        grammar
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('grammar/create');
    }

    edit(req, res, next) {
        Grammar.findById(req.params.id)
            .then((grammar) =>
                res.render('grammar/edit', {
                    grammar: mongooseToObject(grammar),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        const formdata = req.body;
        Grammar.updateOne({ _id: req.params.id }, formdata)
            .then(() => res.redirect('/me/stored/grammars'))
            .catch(next);
    }

    show(req, res, next) {
        Grammar.findOne({ _id: req.params.id })
            .then(async (grammar) => {
                console.log(typeof(grammar.grammar_content))
                res.render('grammar/show', {
                    grammar: mongooseToObject(grammar)
                });
            })
            .catch(next);
    }
}
module.exports = new GrammarController();