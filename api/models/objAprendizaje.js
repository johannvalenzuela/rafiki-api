'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objAprendizajeSchema = new Schema ({
    numero:{
        type: Number
    },
    tipo: {
        type: String, 
        enum: ['Habilidad', 'Conocimiento', 'Actitud']
    },
    descripcion:{
        type: String
    },
});

module.exports = mongoose.model('objaprendizajes', objAprendizajeSchema);