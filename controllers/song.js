'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination');
const artist = require('../models/artist');
const songs = require('../models/songs');
const album = require('../models/album');

function getSong(req, res) {
  let songId = req.params.id;

  song.findById(songId).populate({
    path: 'album'
  }).exec((errm song) => {
    if (err) {
      res.status(500).send({
        message: 'Error petition'
      });
    } else {
      if (!song) {
        res.status(404).send({
          message: 'Song not exist'
        });
      } else {
        res.status(200).send({
          song
        });
      }
    }
  });
}

function getSongs(req, res) {
  let albumId = req.params.album;

  if (!albumId) {
    let find = song.find({}).sort('name');
  } else {
    let find = song.find({
      album: albumId
    }).sort('number')
  }
  find.populate({
    path: 'album',
    populate: {
      path: 'artist',
      model: 'artist'
    }
  }).exec((err, songs) => {
    if (err) {
      res.status(500).send({
        message: 'Error petition'
      });
    } else {
      if (!song) {
        res.status(404).send({
          message: 'Not songs'
        });
      } else {
        res.status(200).send({
          song
        });
      }
    }
  });
}

function saveSong(req, res) {
  let song = new song();

  let params = req.body;
  song.number = params.number;
  song.name = params.name;
  song.duration = params.duration;
  song.file = null;
  song.album = params.album;

  song.save((err, songStored) => {
    if (err) {
      res.status(500).send({
        message: 'Error server'
      });
    } else {
      if (!songStored) {
        res.status(404).send({
          message: 'song not save'
        });
      } else {
        res.status(200).send({
          song: songStored
        });
      }
    }
  });
}

function updateSong(req, res) {
  let songId = req.params.id;
  let update = req.body;

  song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error in server'
      });
    } else {
      if (!songUpdated) {
        res.status(404).send({
          message: 'The song has not been updated'
        });
      } else {
        res.status(200).send({
          song: songUpdated
        });
      }
    }
  });
}

function deleteSong(req, res) {
  let songId = req.params.id;
  song.findByIdAndRemove(songId, (err, songRemoved) => {
    if (err) {
      res.status(500).send({
        message: 'Error in server'
      });
    } else {
      if (!songRemoved) {
        res.status(404).send({
          message: 'The song has not been erased'
        });
      } else {
        res.status(200).send({
          song: songRemoved
        });
      }
    }
  });
}

function uploadFile(req, res) {
  let songId = req.params.id;
  let file_name = 'Not uploaded...';

  if (req.files) {
    let file_path = req.files.file.path;
    let file_split = file.path.split('\\');
    let file_name = file.split[2];

    let ext_split = file_name.split('\.');
    let file_ext = ext_split[1];

    if (file_ext == 'mp3' || file_ext == 'ogg') {
      song.findByIdAndUpdate(songId, {
        file: file_name
      }, (err, songUpdated) => {
        if (!songUpdated) {
          res.status(404).send({
            message: 'Could not update song'
          });
        } else {
          res.status(200).send({
            song: songUpdated
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
      message: 'You have not uploaded the audio file'
    })
  }
}

function getSongFile(req, res) {
  let songFIle = req.params.songFIle;
  let path_file = './uploads/songs/' + songFIle;

  fs.exists(path_file, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({
        message: 'No audio file exists...'
      })
    }
  })
}

module.exports = {
  getSong,
  getSongs,
  saveSong,
  updateSong,
  deleteSong,
  uploadFile,
  getSongFile
};
