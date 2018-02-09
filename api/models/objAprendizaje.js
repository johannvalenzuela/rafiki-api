'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objAprendizajeSchema = new Schema ({
    numero: Number,
    tipo: {
        type: String, 
        enum: ['Habilidad', 'Conocimiento', 'Actitud']
    },
    descripcion: String
});

module.exports = mongoose.model('objaprendizajes', objAprendizajeSchema);