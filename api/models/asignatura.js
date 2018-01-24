'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignaturaSchema = new Schema ({
    //id: String, // Codigo de cada establecimiento
    nombre: String,
    enfasis: Array,
    horasPedagogicasConJecAnual: Number,
    horasPedagogicasSinJecAnual: Number,
    horasPedagogicasConJecSemanal: Number,
    horasPedagogicasSinJecSemanal: Number,
    //profesores:[], // puede tener mas de un profesor si el establecimiento lo ve necesario
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);