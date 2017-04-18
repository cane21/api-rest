'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const songssSchema = Schema({
  name: String,
  number: String,
  duration: String,
  file: String,
  album {
    type: Schema.ObjectId,
    ref: 'albums'
  }
});


module.exports = mongoose.model('songs', songsSchema);
