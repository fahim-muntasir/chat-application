//external import
const {check, validationResult} = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const {unlink} = require('fs');

//internal export 
const User = require('../model/people');

const userValidation = [
    check('name')
        .isLength({min: 1})
        .withMessage("Name is required.")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage("Your name is wrong!")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address!")
        .trim()
        .custom(async (value) => {
            try{
                const user = await User.findOne({email: value});
                if(user){
                    throw createError('This email already used!');
                }
            } catch(err) {
                throw createError(err.message);
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long'),
    
    
]

const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.files.length > 0) {
            const {filename} = req.files[0];
            unlink(path.join(__dirname, `/../../assets/uploads/avatar/${filename}`), (err) => { 
                if (err) {
                    console.log(err);
                }
            });
        }
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

//login validation 
const loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Your email is invalid!')
        .trim(),
    check("password")
        .isLength({min:1})
        .withMessage('Password is required!')
]

const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render('index', {
            errors: mappedErrors
        });
    }
}


module.exports = {userValidation, userValidationHandler, loginValidation, loginValidationHandler}