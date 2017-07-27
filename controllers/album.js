'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');
const artist = require('../models/artist');
const songs = require('../models/songs');
const album = require('../models/album');


function getAlbum(req, res) {
  let albumId = req.params.id;

  album.findById(albumId).papulate({
    path: 'artist'
  }).exec((err, album) => {
    if (err) {
      res.status(500).send({
        message: 'Error petition'
      });
    } else {
      if (!album) {
        res.status(404).send({
          message: 'Album not exist'
        });
      } else {
        res.status(200).send({
          album
        });
      }
    }
  });
}

function getAlbums(req, res) {
  let artistId = req.params.id;

  if (!artistId) {
    //REMOVE ALL ALBUM DDBB
    let find = album.find({}).sort('title');
  } else {
    //TO REMOVE THE ALBUM OF A SPECIFIC ARTIST FROM DDBB
    let album = album.find({
      artist: artistId
    }).sort('year');
  }

  find.populate({
    path: 'artist'
  }).exec((err, albums) => {
    if (err) {
      res.status(500).send({
        message: 'Error petition'
      });
    } else {
      if (!album) {
        res.status(404).send({
          message: 'Not albums'
        });
      } else {
        res.send(200).send({
          albums
        });
      }
    }
  })
}

function saveAlbum(req, res) {
  let album = album new album();

  let params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.year = params.year;
  album.image = 'null';
  album.artist = params.artist;

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({
        message: 'Error in server'
      });
    } else {
      if (!albumStored) {
        res.status(404).send({
          message: 'Album not save'
        });
      } else {
        res.status(200).send({
          album: albumStored
        });
      }
    }
  });
}

function updateAlbum(req, res) {
  let albumId = req.params.id;
  let update = req.body;

  album.findByAndUpdate(albumId, update, (err, albumUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error in server'
      });
    } else {
      if (!albumUpdated) {
        res.status(404).send({
          message: 'Not save album'
        });
      } else {
        res.status(200).send({
          album: albumUpdated
        });
      }
    }
  });
}

function deleteAlbum(req, res) {
  let albumId = req.params.id;

  album.findByIdAndRemove(albumId, (err, albumRemoved) => {

    if (err) {
      res.status(500).send({
        message: 'Error delete album'
      });
    } else {
      if (!artistRemoved) {
        res.status(404).send({
          message: 'Error album not delete'
        });
      } else {
        song.find({
          album: albumRemoved._id
        }).remove((err, songRemoved) => {
          if (err) {
            res.status(500).send({
              message: 'Error delete song'
            });
          } else {
            if (!songRemoved) {
              res.status(404).send({
                message: 'Song not delete'
              });
            } else {
              res.status(404).send({
                album: albumRemoved
              });
            }
          }
        });
      }
    }
  });
}

function uploadImage(req, res) {
  let albumId = req.params.id;
  let file_name = 'Not updated...';

  if (req.files) {
    let file_path = req.files.images.path;
    let file_split = file_path.split('\\');
    let file_name = file_split[2];

    let ext_split = file_name.split('\.');
    let file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

      album.findByIdAndUpdate(albumId, {
        image: file_name
      }, (err, albumUpdated) => {
        if (!albumUpdated) {
          res.status(404).send({
            message: 'The user could not be updated'
          });
        } else {
          res.status(200).send({
            album: albumUpdated
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
  let path_file = './uploads/albums/' + imageFile;
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
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFiles
};
