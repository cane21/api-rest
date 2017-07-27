'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secret';

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(404).send({
      message: 'The request does not have the authentication header'
    });
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    let payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token expired'
      });
    }
  } catch (ex) {

  }

  req.user = payload;

  next();
};
