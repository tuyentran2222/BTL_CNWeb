module.exports = async (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect(`/login?redirect_url=${req.originalUrl}`);
    }
    next();
};
