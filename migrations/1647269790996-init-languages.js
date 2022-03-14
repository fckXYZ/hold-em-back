const mongoose = require('mongoose');
const Language = require('../src/models/language.model');

const config = require('../src/config/index');

const initLangs = require('../src/config/init').languages;

module.exports.up = (next) => {
  mongoose.connect(config.MONGO_DB_ADDRESS)
    .then(() => {
      Promise.all(initLangs.map(async (lang) => {
        await Language.create({
          name: lang.name,
          locale: lang.locale,
        })
          .then(() => true)
          .catch((err) => {
            console.error(err);
          });
      }))
        .then(() => next());
    });
};

module.exports.down = (next) => {
  next();
};
