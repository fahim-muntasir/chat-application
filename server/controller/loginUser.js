const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createErrors = require('http-errors');

//internal export
const User = require('../model/people');

const loginUser = async (req, res) => {
    try{
        const findUser = await User.findOne({email: req.body.email});
        if (findUser && findUser._id) {
            const checkPassword = await bcrypt.compare(req.body.password, findUser.password);

            if(checkPassword){
                const userInfo = {
                    id:findUser._id,
                    name: findUser.name,
                    avatar: findUser.avatar ? findUser.avatar : null
                }
                console.log(userInfo);
                //CREATE token
                const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });

                //set cookies
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true
                })
                
                res.locals.loggedinUserInfo = userInfo;

                res.redirect('/inbox');
            } else {
                throw createErrors('Login failed!');
            }
        } else {
            throw createErrors('Login failed!');
        }
    } catch (err) {
        res.render('index', {
            errors: {
                common:{
                    msg: err.message
                }
            }
        })
    }
}

const rediractLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if (!cookies) {
        next();
    } else {
        res.redirect('/inbox');
    }
}

//logout user
const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('Logout successfull.');
}

module.exports = {loginUser, logout, rediractLogin};