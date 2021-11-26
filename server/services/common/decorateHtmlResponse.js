function decorateHtmlResponse(title){
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = `${title}-${process.env.APP_NAME}`;
        res.locals.errors = {};
        res.locals.logInUser = '';
        res.locals.loggedinUserInfo = {}
        res.locals.data = {};
        next();
    }
}

module.exports = decorateHtmlResponse;