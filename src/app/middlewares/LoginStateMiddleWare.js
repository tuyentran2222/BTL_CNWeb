const User = require('../models/User');
module.exports = async (req, res, next) => {
    res.locals.login = {
        admin: false,
        status: false,
        name: '',
    };

    if (req.session.user_id) {
        res.locals.login.status = true;
        const user = await User.findOne({ _id: req.session.user_id }).lean();
        res.locals.login.admin = user.admin;
        res.locals.login.name = user.name;
    }
    next();
};
