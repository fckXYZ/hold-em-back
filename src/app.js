const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/index');

const mainRouter = require('./routes/index');

const app = express();

const run = async () => {
  try {
    await mongoose.connect(config.MONGO_DB_ADDRESS);

    console.log('DB connected successfully!');

    await app.listen(config.PORT, () => {
      console.log(`Up! Listening to ${config.PORT}`);
    });
    app.use('/api', mainRouter);
  } catch (error) {
    console.error(error);
  }
};

run();
