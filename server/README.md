# AI - Integration Server

## Node envionement with Express.js and MongoDB

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
[http://localhost:3001](http://localhost:3001) to access the API services available in the application

### `models`

User - To store the user chats and image generation requests with the help of browser cookie Id

Chat - The chat initialted from the client 

ImageData - AI image generation request and the response of the Open AI stored

### `Authorization`

The application supports the anonymous user with JWT token authorization

The JWT token generated with the Anonymous user Id from the mongo collection
