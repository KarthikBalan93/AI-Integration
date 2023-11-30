const { chatCompletion } = require('../services/openai');
const Chat = require('../models/chat');
const mongoose = require('mongoose');
const Message = require('../models/message');

const sendMessage = async (req, res) => {
    var thread, messages, newMessages = [], message, hasError;
    messages = [
        { role: "system", content: "You are a helpful assistant." }
    ];
    message = "Unable to process your request, please try again!";
    hasError = true;
    if (!req.body.chatId) {
        thread = await Chat.create({
            userId: req.user._id
        });
        newMessages = [...messages]
    } else {
        thread = await Chat.aggregate([
            {
              $match:
                {
                  _id: new mongoose.Types.ObjectId(req.body.chatId),
                },
            },
            {
              $lookup:
                {
                  from: "messages",
                  localField: "_id",
                  foreignField: "chatId",
                  as: "messages",
                },
            },
            {
                $project: {
                    userId: 1,
                  messages: {
                    content: 1,
                    role: 1
                  }
              }
            }
          ]);
        thread = thread[0] || null
        // messages = thread?.messages || messages
    }
    if (req.body.message) {
        // messages.push({ role: 'user', content: req.body.message })
        messages = [{ role: 'user', content: req.body.message }]
        newMessages.push({ role: 'user', content: req.body.message })
    }
    console.log(messages)
    let chatResponse = await chatCompletion(messages);
    if (chatResponse?.choices?.[0]) {
        newMessages.push({ ...chatResponse.choices[0]['message'] });
        message = chatResponse.choices[0]['message'].content;
        hasError = false;
    }
    newMessages.map(i => i.chatId = thread._id);
    await Message.insertMany(newMessages)
    return res.send({ hasError, message, chatId: thread._id })
}

module.exports = { sendMessage }