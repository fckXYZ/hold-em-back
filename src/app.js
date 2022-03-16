const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/index');

const mainRouter = require('./routes/index');
const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const run = async () => {
  try {
    await mongoose.connect(config.MONGO_DB_ADDRESS);

    console.log('DB connected successfully!');

    await app.listen(config.PORT, () => {
      console.log(`Up! Listening to ${config.PORT}`);
    });
    app.use('/api', mainRouter);
    app.use(errorsHandler); // custom errors handler
  } catch (error) {
    console.error(error);
  }
};

run();
