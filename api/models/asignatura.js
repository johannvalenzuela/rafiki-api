'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Asignatura
const AsignaturaSchema = new Schema ({
    nombre:{
        type: String
    },
    enfasis:{
        type: [{
            type: String
        }]
    },
    horasPedagogicasConJecAnual:{
        type: Number
    },
    horasPedagogicasSinJecAnual:{
        type: Number
    },
    horasPedagogicasConJecSemanal:{
        type: Number
    },
    horasPedagogicasSinJecSemanal:{
        type: Number
    },
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);