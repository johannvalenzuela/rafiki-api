'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objAprendizajeSchema = new Schema ({
    identificador:{
        type: String
    },
    tipo: {
        type: String, 
        enum: ['Habilidad', 'Conocimiento', 'Actitud']
    },
    descripcion:{
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('objaprendizajes', objAprendizajeSchema);