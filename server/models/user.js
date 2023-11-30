const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: "String" },
        email: { type: "String", unique: true },
        password: { type: "String" },
        picture: {
            type: "String",
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAnonymous: {
            type: Boolean,
            required: true,
            default: true,
        },
        browserCookieId: {
            type: String,
        }
    },
    { timestaps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;