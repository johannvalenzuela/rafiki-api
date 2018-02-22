'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrientacionCurricularSchema = new Schema ({

    introduccion:{
        type:  String
    },
    asignaturas: [{
        type: Schema.Types.ObjectId, ref: 'niveles'
    }], 
   
    // el modelo programaEstudio aún no existe, cambiar a type ObjectId posteriormente.
    programaEstudio:{
        type: String
    },

    createAt: {
        type: Date,
        default: Date.now
    }
   
});

module.exports = mongoose.model('orientaciones', OrientacionCurricularSchema);