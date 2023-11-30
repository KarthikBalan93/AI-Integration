const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
    },
    { timestaps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;