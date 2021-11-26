//internal import 
const Message = require('../model/messages');
const Conversation = require('../model/conversetion');

const getMessage = async (req, res) => {
    try{
        
        const findMessages = await Message.find({
            conversation_id: req.params.conversation_id
        }).sort('-createdAt');

        const { participate } = await Conversation.findById(req.params.conversation_id);

        res.status(200).json({
            data:{
                messages: findMessages,
                participate
            }
        })

    } catch (err) {
        res.status(500).json({
            errors: {
                msg: "Messages not found!"
            }
        })
    }
}

module.exports = getMessage;