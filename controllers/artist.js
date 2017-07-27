'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');
const artist = require('../models/artist');
const songs = require('../models/songs');
const album = require('../models/album');


function getArtist(req, res) {

  let artistId = req.params.id;

  artist.findById(artistId, (err, artist) => {
    if (err) {
      res.status(500).send({
        message: 'Error in petition'
      });
    } else {
      if (!artist) {
        res.status(200).send({
          message: 'Artis not exist'
        });
      } else {
        res.status(200).send({
          artist
        });
      }
    }
  })

}

function getArtists(req, res) {
  if (req.params.page) {
    let page = req.params.page;
  } else {
    let page = 1;
  }

  let itemPerPage = 3;

  artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total) {
    if (err) {
      res.status(500).send({
        message: 'Error petition'
      });
    } else {
      if (!artists) {
        res.status(404).send({
          message: 'Not artists'
        });
      } else {
        return res.status(200).send({
          total_items: total,
          artists: artists
        });
      }
    }
  })
}

function saveArtist(req, res) {
  let artist = new artist();

  let params = req.body;
  artist.name = params.name;
  artist.description = params.description;
  artis.image = 'null';

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({
        message: 'Error save artist'
      });
    } else {
      if (!artistStored) {
        res.status(200).send({
          message: 'Artist not save'
        });
      } else {
        res.status(200).send({
          artist: artistStored
        });
      }
    }
  })
}

function updateArtist(req, res) {
  let artistId = req.params.id;
  let update = req.body;

  artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error save artist'
      });
    } else {
      if (!artistUpdated) {
        res.status(404).send({
          message: 'Artist not update'
        });
      } else {
        res.status(200).send({
          artist: artistUpdated
        });
      }
    }
  });
}

function deleteArtist(req, res) {
  let artistId = req.params.id;

  artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
    if (err) {
      res.status(500).send({});
      message: 'Error delete artist'
    } else {
      if (!artistRemoved) {
        res.status(404).send({
          message: 'Artist not delete'
        });
      } else {

        album.find({
          artist: artistRemoved._id
        }).remove((err, albumRemoved) => {

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
                      artist: artistRemoved
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
}

function uploadImage(req, res) {
  let artistId = req.params.id;
  let file_name = 'Not updated...';

  if (req.files) {
    let file_path = req.files.images.path;
    let file_split = file_path.split('\\');
    let file_name = file_split[2];

    let ext_split = file_name.split('\.');
    let file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

      artist.findByIdAndUpdate(artistId, {
        image: file_name
      }, (err, artistUpdated) => {
        if (!artistId) {
          res.status(404).send({
            message: 'The user could not be updated'
          });
        } else {
          res.status(200).send({
            artist: artistUpdated
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
  let path_file = './uploads/artists/' + imageFile;
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
  getArtist,
  getArtists,
  saveArtist,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFiles
};
