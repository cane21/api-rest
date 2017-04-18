'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const albumsSchema = Schema({
  title: String,
  description: String,
  image: String,
  year: String,
  artist: {
    type: Schema.ObjectId,
    ref: 'artist'
  }
});


module.exports = mongoose.model('albums', albumsSchema);
