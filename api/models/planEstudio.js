'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planEstudioSchema = new Schema({
    nombre: {
        type: String,
    },

    asignaturas: [{
        nombre: {
            type: String
        },
        horasMensuales: {
            type: Number,
            min: 0
        },
        horasAnuales: {
            type: Number,
            min: 0
        }
    }],

    tipo: {
        type: String,
        lowercase: true,
        enum: ['con jec', 'sin jec']
    },

    horasLibreDisposicion: {
        type: Number,
        min: 0
    },

    // 3ro y 4to medio
    // FG: Formacion General
    totalTiempoMinFG: {
        type: Number,
        min: 0
    },

    // FD: Formacion Diferenciada
    totalTiempoMinFD: {
        type: Number,
        min: 0
    }
})
module.exports = mongoose.model('PlanEstudio', planEstudioSchema);