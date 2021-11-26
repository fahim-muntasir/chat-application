//internal import 
const User = require('../model/people');

const userSerach = async (req, res) => {
    try{
        const user = await User.find({
            $or: [
                {name: req.body.user},
                {email: req.body.user}
            ]
        })
        
        if (user.length > 0) {
            res.status(200).json({
                user: user
            })
        } else {
            throw "User not found!";
        }
    } catch (err) {
        res.status(500).json({
            errors:{
                msg: 'User not found!'
            }
        })
    }
}

module.exports = userSerach;