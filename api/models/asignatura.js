'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema

const AsignaturaSchema = new Schema ({
    //id: String, // Codigo de cada establecimiento
    nombre: String,
    enfasis:[],
    horasPedagogicasConJecAnual: Number,
    horasPedagogicasSinJecAnual: Number,
    horasPedagogicasConJecSemanal: Number,
    horasPedagogicasSinJecSemanal: Number,
    //profesores:[], // puede tener mas de un profesor si el establecimiento lo ve necesario
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);