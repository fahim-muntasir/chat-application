const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//internal import 
const User = require('../model/people');

const create = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let newUser;
    
    if (req.files && req.files.length >0) {
        newUser = await new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword
        })
    } else {
        newUser = await new User({
            ...req.body,
            password: hashPassword
        })
    }

    try{
        const result = await newUser.save();
        res.status(200).json({
            msg: 'User add successfull.'
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: "Unknown error occured!"
            }
        })
    }
}

module.exports = {create}