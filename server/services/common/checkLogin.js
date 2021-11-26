//external import
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookie) {
        try{
            const token = cookie[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (res.locals.html) {
                res.locals.logInUser = decoded;
            }
            next();
        } catch (err) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(500).json({
                    errors:{
                        common:{
                            msg: "Authintation failed!"
                        }
                    }
                })
            }
        }
    } else {
        if (res.locals.html) {
            res.redirect('/');
        } else {
            res.status(500).json({
                errors:{
                    common:{
                        msg: "Authintation failed!"
                    }
                }
            })
        }
    }

}

module.exports = checkLogin;