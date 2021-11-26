
//internal export 
const Messages = require('../model/messages');

const sendMessage = async (req, res) => {
        if(req.body.message || (req.files && req.files.length > 0)){
            try{
                let attestments = null;
                if(req.files && req.files.length > 0){
                    attestments = [];
                    req.files.forEach(file => {
                        attestments.push(file.filename);
                    });
                }

                console.log(attestments);
                const newMessage = new Messages({
                    text: req.body.message,
                    attchment: attestments,
                    sender: {
                        id: req.user.id,
                        name: req.user.name,
                        avatar: req.user.avatar || null
                    },
                    resever: {
                        id: req.body.reseveId,
                        name: req.body.reseveName,
                        avatar: req.body.reseveAvatar || null
                    },
                    conversation_id: req.body.conversation_id
                })
    
                const result = await newMessage.save();

                io.emit('send_message', {
                    message: {
                        text: req.body.message,
                        attchment: attestments,
                        sender: {
                            id: req.user.id,
                            name: req.user.name,
                            avatar: req.user.avatar || null
                        },
                        current_conversation_id: req.body.conversation_id
                    }
                })

                res.status(200).json({
                    message: "successfull",
                    data:result
                })
            } catch (err) {
                res.status(500).json({
                    errors:{
                        common:{
                            msg: err.message,
                        }
                    }
                })
            }
        } else {
            res.status(500).json({
                errors:{
                    common: "message and attesment required!"
                }
            })
        }
}

module.exports = sendMessage;