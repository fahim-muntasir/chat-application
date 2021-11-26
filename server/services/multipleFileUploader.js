const multer = require('multer');
const path = require('path');
const createErrors = require('http-errors');

function uploader(subfolder_path, allowed_file_type, max_file_size, error_msg){

    //file upload path 
    const UPLOAD_FOLDER = `${__dirname}/../../assets/uploads/${subfolder_path}`;

    const storage = multer.diskStorage({
        destination: function (req, file, cd){
            cd(null, UPLOAD_FOLDER);
        },
        filename: function (req, file, cd){
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')+ "-" + Date.now();
            cd(null, fileName+fileExt);
        }
    })

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: function (req, file, cd){
            if(allowed_file_type.includes(file.mimetype)){
                cd(null, true);
            } else {
                cd(createErrors(error_msg))
            }
        }
    })

    return upload;
}

module.exports = uploader;