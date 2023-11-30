const axios = require('axios');
const OPENAI_URL = process.env.OPENAI_URL;
const OPENAI_KEY = process.env.OPENAI_KEY

const chatCompletion = async (messages) => {
    var config = {
        method: 'post',
        url: OPENAI_URL + '/chat/completions',
        headers: {
            'Authorization': 'Bearer ' + OPENAI_KEY,
        },
        data: {
            model: "gpt-3.5-turbo",
            messages
        }
    };
    return await axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error.response.data)
            return { hasError: true, errorMessage: error.response.data }
        });
}

const createImage = async (description) => {
    var config = {
        method: 'post',
        url: OPENAI_URL + '/images/generations',
        headers: {
            'Authorization': 'Bearer ' + OPENAI_KEY,
        },
        data: {
            prompt: description,
            model: 'dall-e-3'
        }
    };
    return await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data))
            return response.data
        })
        .catch(function (error) {
            console.log(error.response.data)
            return { hasError: true, errorMessage: error.response.data }
        });
}

module.exports = { chatCompletion, createImage }


