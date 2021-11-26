const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    creator:{
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String
    },
    participate: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String
    },
    last_update: {
        type: Date,
        default: Date.now
    }
}, {timestamps:true})

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;