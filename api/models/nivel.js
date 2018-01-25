'use strict'

/************** Para conexión con la BD mongo ******************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NivelSchema = Schema({
    sigla: String, 
    tipo_nivel: String,
    grado: Number,
    descripcion: String,
    decreto: String
 
})

module.exports = mongoose.model('niveles', NivelSchema)
