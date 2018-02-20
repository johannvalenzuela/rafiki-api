'use strict'

/************** Para conexión con la BD mongo ******************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NivelSchema = Schema({
    sigla: String, 
    tipo_nivel: String,
    grado: Number,
    descripcion: String,
    decreto: String,

    objetivos_aprendizajes: [{
        type: Schema.Types.ObjectId, ref: 'objaprendizajes'
       
    }], 
    asignatura: {
        type: Schema.Types.ObjectId, ref: 'Asignatura'
    }
 
})

module.exports = mongoose.model('niveles', NivelSchema)
