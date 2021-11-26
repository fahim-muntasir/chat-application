//internal import 
const Conversation = require('../model/conversetion');

const create_conversation = async (req, res) => {

    try{

        const createCon = await new Conversation({
            creator:{
                id: req.user.id,
                name: req.user.name,
                avatar: req.user.avatar
            },
            participate: {
                id: req.body.id,
                name: req.body.participate,
                avatar: req.body.avatar
            },
            last_update: Date.now()
        })
        const result = await createCon.save();
        res.send(true);
    } catch (err) {
        res.status(500).json({
            errors: {
                msg: "sumthing is wrong!"
            }
        })
    }
}

module.exports = create_conversation;