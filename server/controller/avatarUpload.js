// internal import
const uploader = require('../services/singleUploader');

const avatarUpload = (req, res, next) => {
    const upload = uploader(
        "avatar",
        ["image/jpeg", "image/png", "image/jpg"],
        1000000,
        "Only .jpeg, .png, .jpg formate allowed!"
    )
    upload.any()(req, res, (err) => {
        if(err){
            console.log('attestMentError' + err);
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                }
            })
        } else {
            next();
        }
    })
}

module.exports = avatarUpload;