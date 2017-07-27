'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/musicdb', (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('connected DB.');

    app.listen(port, () => {
      console.log("Server API listen" + port)
    });
  }
});
