'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  nombre: {
    type: String
  },
  correo: {
    type: String,
    index: true
  },
  rut: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: [{
      type: String,
      enum: ['profesor', 'utp', 'director','apoderado','alumno','admin']
    }],
    default: ['profesor']
  }
});

module.exports = mongoose.model('Users', UserSchema);