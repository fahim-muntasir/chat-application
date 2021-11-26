const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    text: {
        type: String
    },
    attchment: [
        {
            type: String 
        }
    ], 
    sender: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String 
    },
    resever: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String
    },
    date_tyme:{
        type: Date,
        default: Date.now
    },
    conversation_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Messages = mongoose.model('Message', messagesSchema);

module.exports = Messages;