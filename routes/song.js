'use strict'

const express = require('express');
const songController = require('../controllers/artist');
const api = express.Router();
const md_auth = require('../middlewares/auth');
const multipart = require('connect-multiparty');
const md_upload = multipart({
  uploadDir: './uploads/songs'
});

api.get('/song/:id', md_auth.ensureAuth, songController.getSong);
api.post('/song', md_auth.ensureAuth, songController.saveSong);
api.post('/songs/album?', md_auth.ensureAuth, songController.getSongs);
api.put('/song/:id', md_auth.ensureAuth, songController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, songController.deleteSong);
api.post('/get-file-song/:id', [md_auth.ensureAuth, md_upload], songController.uploadFile);
api.get('/get-song-file/:songFIle', songController.getSongFile);



module.exports = api;
