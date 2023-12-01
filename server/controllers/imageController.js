const { createImage } = require('../services/openai');
const mongoose = require('mongoose');
const ImageData = require('../models/image');


const generateImage = async (req, res) => {
    try {
        if (!req.body.description) return res.send({ hasError: true, errorMessage: 'Description is required' });
        let aiResponse = await createImage(req.body.description);

        if (!aiResponse.hasError) {
            await ImageData.create({
                userId: new mongoose.Types.ObjectId(req.user._id),
                content: req.body.description,
                response: aiResponse
            })
            return res.send({ hasError: false, imageUrl: aiResponse.data[0].url });
        } else {
            return res.send({ hasError: true, errorMessage: "Sorry, we can't able to process your request right now. Try again later, Thanks!" })
        }
    } catch (err) {
        return res.send({ hasError: true, errorMessage: "Sorry, we can't able to process your request right now. Try again later, Thanks!"})
    }
}

module.exports = { generateImage }