const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'chats' },
        role: { type: String },
        content: { type: String },
    },
    { timestaps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;