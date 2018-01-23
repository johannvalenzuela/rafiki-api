'use strict'

/************** Para conexión con la BD mongo ******************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// realizando conexion con la bd
mongoose.connect('mongodb://localhost/niveles');



const NivelSchema = Schema({
    sigla: String, 
    tipo_nivel: String,
    grado: String,
    descripcion: String,
    decreto: String
 
})

module.exports = mongoose.model('niveles', NivelSchema)
