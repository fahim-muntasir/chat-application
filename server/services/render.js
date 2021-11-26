const Conversation = require('../model/conversetion');

const index = (req, res) => {
    res.render('index');
}

const inbox = async (req, res) => {

    const conversationUser = await Conversation.find({
        $or:[
            {"creator.id": req.user.id},
            {"participate.id": req.user.id}
        ]
    })

    res.locals.data = conversationUser;
    res.render('inbox');
}

module.exports = {index, inbox};