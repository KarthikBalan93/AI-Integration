const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        content: { type: String, required: true },
        response: { type: Object }
    },
    { timestaps: true }
);

const ImageData = mongoose.model("image", imageSchema);

module.exports = ImageData;