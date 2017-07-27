'use strict'

const express = require('express');
const albumController = require('../controllers/album');
const api = express.Router();
const md_auth = require('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({
  uploadDir: './uploads/albums'
});

api.get('/album/:id', md_auth.ensureAuth, albumController.getAlbum);
api.post('/album', md_auth.ensureAuth, albumController.saveAlbum);
api.get('/albums/:artist', md_auth.ensureAuth, albumController.getAlbums);
api.put('/album/:id', md_auth.ensureAuth, albumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth.albumController.deleteAlbum);
api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload], albumController.uploadImage);
api.get('/get-image-album/:imageFile', albumController.getImageFiles);


module.exports = api;
