require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (config.allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server started up and running in ${port}`);
});