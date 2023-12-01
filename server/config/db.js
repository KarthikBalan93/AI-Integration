const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  let isConnected = false;
  let attemptCount = 0;
  const maxAttempts = 3; // Set the maximum number of connection attempts

  while (!isConnected && attemptCount < maxAttempts) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await checkDatabaseStatus();

      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
      isConnected = true;
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
      attemptCount++;
      if (attemptCount < maxAttempts) {
        console.log(`Retrying connection... Attempt ${attemptCount}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error(`Maximum connection attempts reached. Exiting...`.red.bold);
        process.exit(1);
      }
    }
  }
};

const checkDatabaseStatus = async () => {
  const result = await mongoose.connection.db.admin().ping();
  if (!result) {
    throw new Error('MongoDB is not responsive.');
  }
};

module.exports = connectDB;
