'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrientacionCurricularSchema = new Schema ({

    basesCurriculares: String,
    programaEstudio: String
   
});

module.exports = mongoose.model('orientaciones', OrientacionCurricularSchema);