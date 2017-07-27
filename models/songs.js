'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const songsSchema = Schema({
  name: String,
  number: String,
  duration: String,
  file: String,
  album {
    type: Schema.ObjectId,
    ref: 'album'
  }
});


module.exports = mongoose.model('songs', songsSchema);
