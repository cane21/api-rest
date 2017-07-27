'use strict'

const express = require('express');
const userController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/auth');

const multipart = require('connect-multiparty');
const md_upload = multipart({
  uploadDir: './uploads/users'
});

api.get('');
api.get('/get-image-user/:imageFile', userController.getImageFiles);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.post('/update-user/:id', md_auth.ensureAuth, userController.updateUser);
api.put('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);



module.exports = api;
