const Uploader = require('../services/multipleFileUploader');

const attestmentUpload = (req, res, next) => {
    const upload = Uploader(
        "attestment",
        ["image/jpeg", "image/png", "image/jpg"],
        1000000,
        "Only .jpeg, .png, .jpg formate allowed!"
    )

    upload.any()(req, res, (err) =>{
        if(err){
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

module.exports = attestmentUpload;