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
    enfoque:{
        type: [{
            type: String
        }]
    },
    propositoFormativo:{
        type: String
    }
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);