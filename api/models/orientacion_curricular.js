'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrientacionCurricularSchema = new Schema ({

    introduccion: String,
    asignaturas: [{
        type: Schema.Types.ObjectId, ref: 'Asignatura'
    }], 
   
    // el modelo programaEstudio aún no existe, cambiar a type ObjectId posteriormente.
    programaEstudio: String
   
});

module.exports = mongoose.model('orientaciones', OrientacionCurricularSchema);