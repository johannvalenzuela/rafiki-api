'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Asignatura
const AsignaturaSchema = new Schema ({
    nombre: String,
    enfasis: Array,
    horasPedagogicasConJecAnual: Number,
    horasPedagogicasSinJecAnual: Number,
    horasPedagogicasConJecSemanal: Number,
    horasPedagogicasSinJecSemanal: Number,
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);