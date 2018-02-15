'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrientacionCurricularSchema = new Schema ({

    introduccion: String,
    asignaturas: {
        type: [{
            enfoque: String,
            enfasis: String,
            proposito_formativo: String,
            asignatura: String
        }]
    }, 
   
    basesCurriculares: String,
    programaEstudio: String
   
});

module.exports = mongoose.model('orientaciones', OrientacionCurricularSchema);