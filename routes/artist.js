'use strict'

const express = require('express');
const artistController = require('../controllers/artist');
const api = express.Router();
const md_auth = require('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({
  uploadDir: './uploads/artists'
});

api.get('/artist/:id', md_auth.ensureAuth, artistController.getArtist);
api.get('/artist', md_auth.ensureAuth, artistController.saveArtist);
api.get('/artists/:page?', md_auth.ensureAuth, artistController.getArtists);
api.get('/get-image-artist/:imageFile', artistController.getImageFiles);
api.put('/artist/:id', md_auth.ensureAuth, artistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, artistController.deleteArtist);
api.put('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);


module.exports = api;
