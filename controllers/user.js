'use strict'

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const user = require('../models/user');
const jwt = require('../services/jwt');



function saveUser(req, res) {

  let user = new user();
  let params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if (params.password) {
    //BCRYPT PASSWORD
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        // USER SAVE
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({
              message: 'Error save user'
            });
          } else {
            if (!userStored) {
              res.status(404).send({
                message: 'Unregistered user'
              });
            } else {
              res.status(200).send({
                user: userStored
              });
            }
          }
        });
      } else {
        res.status(200).send({
          message: 'Insert all fields'
        });
      }
    });
  } else {
    res.status(200).send({
      message: 'check your password'
    });
  }
}

function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;

  user.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    if (err) {
      res.status(500).send({
        message: 'Error on request'
      });
    } else {
      if (!user) {
        res.status(404).send({
          message: 'User does not exist'
        });
      } else {
        //CHECK PASSWORD
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            //RETURN USER DATA
            if (params.gethash) {
              //RETURN TOKEN JWT
              res.status(200).send({
                token: jwt.createToken(user)
              });

            } else {
              res.status(404).send({
                user
              });
            }
          } else {
            res.status(404).send({
              message: 'The user could not login'
            });
          }
        })
      }
    }
  });
}

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

  user.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error updating user'
      });
    } else {
      if (!userUpdated) {
        res.status(404).send({
          message: 'The user could not be updated'
        });
      } else {
        res.status(200).send({
          user: userUpdated
        });
      }
    }
  });
}

function uploadImage(req, res) {
  let userId = req.params.id;
  let file_name = 'Not updated...';

  if (req.files) {
    let file_path = req.files.images.path;
    let file_split = file_path.split('\\');
    let file_name = file_split[2];

    let ext_split = file_name.split('\.');
    let file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

      user.findByIdAndUpdate(userId, {
        image: file_name
      }, (err, userUpdated) => {
        if (!userUpdated) {
          res.status(404).send({
            message: 'The user could not be updated'
          });
        } else {
          res.status(200).send({
            image: file_name,
            user: userUpdated
          });
        }
      });

    } else {
      res.status(200).send({
        message: 'Invalid file extension'
      });
    }


  } else {
    res.status(200).send({
      message: 'You have not uploaded any images'
    });
  }
}

function getImageFiles(req, res) {
  let imageFile = req.params.imageFile;
  let path_file = './uploads/users/' + imageFile;
  fs.exist(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({
        message: 'No exist image'
      });
    }
  });
}

module.exports = {
  saveUser,
  loginUser,
  userUpdated,
  uploadImage,
  getImageFiles
};
