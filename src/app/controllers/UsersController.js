const User = require('../models/User');
const bcrypt = require('bcrypt');
class UsersController {
    // [GET] /Users/
    new(req, res, next) {
        res.render('users/new');
    }

    async create(req, res, next) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const formdata = {
                username: req.body.username,
                password: hashedPassword,
            };
            console.log(hashedPassword);
            const user = new User(formdata);
            user.save()
                .then(async (err) => {
                    const user = await User.findOne({ username: formdata.username }).lean();
                    req.session.user_id = user._id;
                    res.redirect('/');
                })
                .catch(next);
        } catch {
            res.status(500).send();
        }
    }
}

module.exports = new UsersController();
