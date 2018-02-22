'use strict'

/************** Para conexión con la BD mongo ******************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NivelSchema = Schema({
    sigla: {
        type: String

    },
    tipo_nivel: {
        type: String

    },
    grado: {
        type: Number

    },
    descripcion: {
        type: String
    },
    decreto: {
        type: String
    },

    oa: [{
        type: Schema.Types.ObjectId, ref: 'objaprendizajes'

    }],
    asignatura: {
        type: Schema.Types.ObjectId, ref: 'Asignatura'
    },

    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('niveles', NivelSchema)
