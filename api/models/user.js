'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  nombre: {
    type: String,
  },
  correo: {
    type: String
  },
  rut: {
    type: String
  },
  // registration_date: {
  //   type: Date,
  //   default: Date.now
  // },
  role: {
    type: [{
      type: String,
      enum: ['profesor', 'utp', 'director','apoderado','alumno']
    }],
    default: ['profesor']
  }
});

module.exports = mongoose.model('Users', UserSchema);