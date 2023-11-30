const asyncHandler = require('express-async-handler');
const User = require('./../models/user');
const { generateToken } = require('../config/util');
const bcrypt = require('bcryptjs');
const registerUser = asyncHandler(async (req, res) => {

});

const registerAnonymousUser = asyncHandler(async (req, res) => {
    const user = await new User();
    const salt = await bcrypt.genSalt(10);
    user.browserCookieId = await bcrypt.hash(user._id.toString(), salt);
    user.isAnonymous = true;
    await user.save()
    return res.send({
        status: true,
        hasError: false,
        data: {
            browserCookieId: user.browserCookieId,
            token: generateToken({ id: user._id, isAnonymous: user.isAnonymous, browserCookieId: user.browserCookieId })
        },
        message: "Anonymous user created successfully!"
    })
})

module.exports = { registerUser, registerAnonymousUser }